import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { In, Repository } from 'typeorm';

import { LoanDto } from './dto/loan.dto';
import { Loan } from './entities/loan.entity';
import { UpdateLoanDto } from './dto/updateLoan.dto';
import { LoanHistoryService } from '../loanHistory/loanHistory.service';
import { CreateLoanHistoryDto } from '../loanHistory/dto/createLoanHistory.dto';
import { NotificationService } from '../notification/notification.service';
import { NOTIFICATION_STATUS } from 'src/utils/contants';
import { Nft } from '../nft/entities/nft.entity';
import { ILoanState } from 'src/utils/contants';
import { Offer } from '../offer/entities/offer.entity';
import { List } from '../list/entities/list.entity';

@Injectable()
export class LoanService {
  constructor(
    @InjectRepository(List) private listRepository: Repository<List>,
    @InjectRepository(Loan) private loanRepository: Repository<Loan>,
    @InjectRepository(Nft) private nftRepository: Repository<Nft>,
    @InjectRepository(Offer) private offerRepository: Repository<Offer>,
    private loanHistoryService: LoanHistoryService,
    private notificationService: NotificationService
  ) {}

  async createLoan(loanDto: LoanDto): Promise<Loan> {
    const loan = new Loan();
    const loanHistory = new CreateLoanHistoryDto();
    if (loanDto) {
      loan.state = 0;
      loan.lenderId = loanDto.lenderId;
      loan.borrowerId = loanDto.borrowerId;
      loan.collectionAddress = loanDto.collectionAddress;
      loan.tokenId = loanDto.tokenId;
      loan.acceptedOfferId = loanDto.acceptedOfferId;
    }
    const newLoan = await this.loanRepository.save(loan);

    if (newLoan && newLoan.id) {
      // Delete List of Loan
      const list = await this.listRepository.findOne({
        where: {
          tokenId: newLoan.tokenId,
          collectionAddress: newLoan.collectionAddress,
          borrowerId: newLoan.borrowerId
        }
      });
      if (list) {
        await this.listRepository.update(list.id, { deletedAt: new Date() });
      }

      // Update state of accepted offer
      await this.offerRepository.update(newLoan.acceptedOfferId, { state: 1 });

      // Delete all unaccepted offer
      const unacceptedOffers = await this.offerRepository.find({
        where: { tokenId: newLoan.tokenId, collectionAddress: newLoan.collectionAddress, state: 0 }
      });
      if (unacceptedOffers && unacceptedOffers.length) {
        const unacceptedOffersIds = unacceptedOffers.map((offer) => offer.id);
        await this.offerRepository.update(
          { id: In(unacceptedOffersIds) },
          { deletedAt: new Date() }
        );
      }

      // Create Loan history
      loanHistory.action = 0;
      loanHistory.lenderId = loanDto.lenderId;
      loanHistory.borrowerId = loanDto.borrowerId;
      loanHistory.loanId = newLoan.id;
      await this.loanHistoryService.createLoanHistory(loanHistory);

      await this.notificationService.createNotification({
        status: NOTIFICATION_STATUS.LOAN,
        userId: loanDto.borrowerId,
        collectionAddress: loanDto.collectionAddress,
        tokenId: loanDto.tokenId
      });
      await this.notificationService.createNotification({
        status: 2,
        userId: loanDto.lenderId,
        collectionAddress: loanDto.collectionAddress,
        tokenId: loanDto.tokenId
      });
    }
    return newLoan;
  }

  async getLoans(options: IPaginationOptions) {
    const loans = await this.loanRepository
      .createQueryBuilder('loan')
      .select()
      .where('deleted_at IS NULL');
    const result = await paginate(loans, options);
    return result ? result : null;
  }

  async getLoansOfNft(collectionAddress: string, tokenId: string, options: IPaginationOptions) {
    const result = await paginate(this.loanRepository, options, {
      relations: ['lender', 'borrower', 'offer'],
      where: {
        collectionAddress,
        tokenId
      },
      order: { createdAt: 'DESC' }
    });
    return result;
  }

  async getLoansLiquified(borrowerId: string, options: IPaginationOptions) {
    const results = await paginate(this.loanRepository, options, {
      relations: ['borrower', 'lender', 'offer'],
      where: { borrowerId },
      order: { createdAt: 'DESC' }
    });

    if (results && results.items) {
      for (const offer of results.items) {
        const nft = await this.nftRepository.findOne({
          relations: ['collection'],
          where: { collection: { address: offer.collectionAddress }, tokenId: offer.tokenId }
        });
        offer['nft'] = nft;
      }

      return results;
    }
    throw new HttpException('No data', HttpStatus.NOT_FOUND);
  }

  async getLoansSupplied(lenderId: string, options: IPaginationOptions) {
    const results = await paginate(this.loanRepository, options, {
      relations: ['borrower', 'lender', 'offer'],
      where: { lenderId },
      order: { createdAt: 'DESC' }
    });

    if (results && results.items) {
      for (const offer of results.items) {
        const nft = await this.nftRepository.findOne({
          relations: ['collection'],
          where: { collection: { address: offer.collectionAddress }, tokenId: offer.tokenId }
        });
        offer['nft'] = nft;
      }

      return results;
    }
    throw new HttpException('No data', HttpStatus.NOT_FOUND);
  }

  async getLoan(borrowerId: string, collectionAddress: string, tokenId: string, state: number) {
    const loan = await this.loanRepository.findOne({
      relations: ['offer'],
      where: { borrowerId, collectionAddress, tokenId, state }
    });
    return loan ? loan : null;
  }

  async updateLoan(id: string, updateLoanDto: UpdateLoanDto) {
    const { state } = updateLoanDto;
    await this.loanRepository.update(id, updateLoanDto);
    const updatedLoan = await this.loanRepository.findOne(id);

    if (updatedLoan) {
      if (state == ILoanState.BREACHED) {
        const offer = await this.offerRepository.findOne(updatedLoan.acceptedOfferId);

        if (offer) {
          const nft = await this.nftRepository.findOne({
            relations: ['collection'],
            where: {
              collection: { address: offer.collectionAddress },
              tokenId: offer.tokenId
            }
          });
          if (nft) this.nftRepository.update(nft.id, { ownerId: offer.lenderId });
        }
      }

      const loanHistory = new CreateLoanHistoryDto();
      loanHistory.action = state;
      loanHistory.lenderId = updatedLoan.lenderId;
      loanHistory.borrowerId = updatedLoan.borrowerId;
      loanHistory.loanId = updatedLoan.id;
      await this.loanHistoryService.createLoanHistory(loanHistory);

      if (state === ILoanState.RETURNED) {
        await this.notificationService.createNotification({
          status: 3,
          userId: updatedLoan.borrowerId,
          collectionAddress: updatedLoan.collectionAddress,
          tokenId: updatedLoan.tokenId
        });
        await this.notificationService.createNotification({
          status: 4,
          userId: updatedLoan.lenderId,
          collectionAddress: updatedLoan.collectionAddress,
          tokenId: updatedLoan.tokenId
        });
      } else if (state === ILoanState.BREACHED) {
        await this.notificationService.createNotification({
          status: 8,
          userId: updatedLoan.lenderId,
          collectionAddress: updatedLoan.collectionAddress,
          tokenId: updatedLoan.tokenId
        });
      }

      return updatedLoan;
    }
    throw new HttpException('Loan not found', HttpStatus.NOT_FOUND);
  }

  async deleteLoan(id: string) {
    await this.loanRepository.update(id, { deletedAt: new Date() });
    const deletedLoan = await this.loanRepository.findOne(id, { withDeleted: true });
    if (deletedLoan) {
      return { id: deletedLoan.id };
    }
    throw new HttpException('Loan not found', HttpStatus.NOT_FOUND);
  }
}
