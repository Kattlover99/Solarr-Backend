import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';

import { CreateLoanHistoryDto } from './dto/createLoanHistory.dto';
import { LoanHistory } from './entities/loanHistory.entity';
import { UpdateLoanHistoryDto } from './dto/updateLoanHistory';

@Injectable()
export class LoanHistoryService {
  constructor(
    @InjectRepository(LoanHistory) private loanHistoryRepository: Repository<LoanHistory>
  ) {}

  async createLoanHistory(loanHistoryDto: CreateLoanHistoryDto): Promise<LoanHistory> {
    const loanHistory = new LoanHistory();
    if (loanHistoryDto) {
      loanHistory.action = loanHistoryDto.action;
      loanHistory.borrowerId = loanHistoryDto.borrowerId;
      loanHistory.lenderId = loanHistoryDto.lenderId;
      loanHistory.loanId = loanHistoryDto.loanId;
    }
    await this.loanHistoryRepository.save(loanHistory);
    return loanHistory;
  }

  async getLoanHistoryByNft(
    collectionAddress: string,
    tokenId: string,
    options: IPaginationOptions
  ) {
    const qb = this.loanHistoryRepository
      .createQueryBuilder('loanHistory')
      .select()
      .innerJoinAndSelect(
        (qb) =>
          qb
            .select('MAX(created_at)', 'latest_time')
            .addSelect('loan_id', 't_loan_id')
            .from(LoanHistory, 'loanHistory')
            .groupBy('loan_id'),
        'sub',
        'sub.t_loan_id = loanHistory.loan_id AND sub.latest_time = loanHistory.created_at'
      )
      .leftJoinAndSelect('loanHistory.borrower', 'borrower')
      .leftJoinAndSelect('loanHistory.lender', 'lender')
      .leftJoinAndSelect('loanHistory.loan', 'loan')
      .leftJoinAndSelect('loan.offer', 'offer')
      .where({
        loan: {
          collectionAddress,
          tokenId
        }
      })
      .orderBy('sub.latest_time', 'DESC');
    const result = await paginate(qb, options);
    return result;
  }

  async getLoanHistorys(options: IPaginationOptions) {
    const result = await paginate(this.loanHistoryRepository, options);
    return result ? result : null;
  }

  async updateLoanHistory(id: string, updateLoanHistoryDto: UpdateLoanHistoryDto) {
    await this.loanHistoryRepository.update(id, updateLoanHistoryDto);
    const updatedLoanHistory = await this.loanHistoryRepository.findOne(id);
    if (updatedLoanHistory) {
      return updatedLoanHistory;
    }
    throw new HttpException('LoanHistory not found', HttpStatus.NOT_FOUND);
  }

  async deleteLoanHistory(id: string) {
    await this.loanHistoryRepository.update(id, { deletedAt: new Date() });
    const deletedLoanHistory = await this.loanHistoryRepository.findOne(id, { withDeleted: true });
    if (deletedLoanHistory) {
      return { id: deletedLoanHistory.id };
    }
    throw new HttpException('LoanHistory not found', HttpStatus.NOT_FOUND);
  }
}
