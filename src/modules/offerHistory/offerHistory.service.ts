import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';

import { CreateOfferHistoryDto } from './dto/createOfferHistory.dto';
import { UpdateOfferHistoryDto } from './dto/updateOfferHistory.dto';
import { OfferHistory } from './entities/offerHistory.entity';

@Injectable()
export class OfferHistoryService {
  constructor(
    @InjectRepository(OfferHistory) private offerHistoryRepository: Repository<OfferHistory>
  ) {}

  async createOfferHistory(offerHistoryDto: CreateOfferHistoryDto): Promise<OfferHistory> {
    const offerHistory = new OfferHistory();
    if (offerHistoryDto) {
      offerHistory.action = offerHistoryDto.action;
      offerHistory.offerId = offerHistoryDto.offerId;
    }
    await this.offerHistoryRepository.save(offerHistory);
    return offerHistory;
  }

  async getOfferHistorys(options: IPaginationOptions) {
    const result = await paginate(this.offerHistoryRepository, options);
    return result ? result : null;
  }

  async updateOfferHistory(id: string, updateOfferHistoryDto: UpdateOfferHistoryDto) {
    await this.offerHistoryRepository.update(id, updateOfferHistoryDto);
    const updatedOfferHistory = await this.offerHistoryRepository.findOne(id);
    if (updatedOfferHistory) {
      return updatedOfferHistory;
    }
    throw new HttpException('OfferHistory not found', HttpStatus.NOT_FOUND);
  }


  async deleteOfferHistory(id: string) {
    await this.offerHistoryRepository.update(id, { deletedAt: new Date() });
    const deletedOfferHistory = await this.offerHistoryRepository.findOne(id, { withDeleted: true });
    if (deletedOfferHistory) {
      return { id: deletedOfferHistory.id };
    }
    throw new HttpException('OfferHistory not found', HttpStatus.NOT_FOUND);
  }
}
