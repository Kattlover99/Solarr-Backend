import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';

import { OfferDto } from './dto/offer.dto';
import { Offer } from './entities/offer.entity';
import { UpdateOfferDto } from './dto/updateOffer.dto';
import { Nft } from '../nft/entities/nft.entity';
import { NotificationService } from '../notification/notification.service';
import { NOTIFICATION_STATUS } from '../../utils/contants';

@Injectable()
export class OfferService {
  constructor(
    @InjectRepository(Offer) private offerRepository: Repository<Offer>,
    @InjectRepository(Nft) private nftRepository: Repository<Nft>,
    private notificationService: NotificationService
  ) {}

  async createOffer(offerDto: OfferDto): Promise<Offer> {
    const offer = new Offer();
    if (offerDto) {
      offer.state = 0;
      offer.loanAmount = offerDto.loanAmount;
      offer.period = offerDto.period;
      offer.apr = offerDto.apr;
      offer.loanType = offerDto.loanType;
      offer.lenderId = offerDto.lenderId;
      offer.borrowerId = offerDto.borrowerId;
      offer.collectionAddress = offerDto.collectionAddress;
      offer.tokenId = offerDto.tokenId;
    }
    await this.offerRepository
      .save(offer)
      .then(async (res) => {
        await this.notificationService.createNotification({
          status: NOTIFICATION_STATUS.OFFERED,
          userId: res.borrowerId,
          collectionAddress: res.collectionAddress,
          tokenId: res.tokenId
        });
      })
      .catch((error) => {
        throw error;
      });

    return offer;
  }

  async getOffers(options: IPaginationOptions) {
    const offers = await this.offerRepository
      .createQueryBuilder('offer')
      .select()
      .where('deleted_at IS NULL');
    const result = await paginate(offers, options);
    return result ? result : null;
  }

  async getOffer(lenderId: string, collectionAddress: string, tokenId: string, state: number) {
    const result = await this.offerRepository.findOne({
      where: { lenderId, collectionAddress, tokenId, state }
    });
    return result ? result : null;
  }

  async getOffersNft(collectionAddress: string, tokenId: string, options: IPaginationOptions) {
    const results = await paginate(this.offerRepository, options, {
      relations: ['lender', 'borrower'],
      where: { collectionAddress, tokenId, state: 0 },
      order: { createdAt: 'DESC' }
    });
    if (results && results.items) {
      for (const offer of results.items) {
        const nft = await this.nftRepository.findOne({
          where: { ownerId: offer.borrowerId, tokenId: offer.tokenId }
        });
        offer['nft'] = nft;
      }

      return results;
    }
    throw new HttpException('No data', HttpStatus.NOT_FOUND);
  }

  async getOffersReceived(borrowerId: string, options: IPaginationOptions) {
    const results = await paginate(this.offerRepository, options, {
      relations: ['borrower', 'lender'],
      where: { borrowerId, state: 0 },
      order: { createdAt: 'DESC' }
    });
    console.log("results: ", results)

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

  async getOffersMade(lenderId: string, options: IPaginationOptions) {
    const results = await paginate(this.offerRepository, options, {
      relations: ['borrower', 'lender'],
      where: { lenderId, state: 0 },
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

  async updateOffer(id: string, updateOfferDto: UpdateOfferDto) {
    await this.offerRepository.update(id, updateOfferDto);
    const updatedOffer = await this.offerRepository.findOne(id);
    if (updatedOffer) {
      return updatedOffer;
    }
    throw new HttpException('Offer not found', HttpStatus.NOT_FOUND);
  }

  async deleteOffer(id: string) {
    await this.offerRepository.update(id, { deletedAt: new Date() });
    const deletedOffer = await this.offerRepository.findOne(id, { withDeleted: true });
    if (deletedOffer) {
      return { id: deletedOffer.id };
    }
    throw new HttpException('Offer not found', HttpStatus.NOT_FOUND);
  }
}
