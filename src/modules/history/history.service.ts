import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';

import { CreateHistoryDto } from './dto/createHistory.dto';
import { History } from './entities/history.entity';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(History) private historyRepository: Repository<History>,
  ) {}

  async createHistory(historyDto: CreateHistoryDto): Promise<History> {
    const history = new History();
    if (historyDto) {
      history.type = historyDto.type;
      history.borrowerAtion = historyDto.borrowerAction;
      history.lenderAtion = historyDto.lenderAction;
      history.userId = historyDto.userId;
      history.collectionAddress = historyDto.collectionAddress;
      history.tokenId = historyDto.tokenId;
    }
    await this.historyRepository.save(history);
    return history;
  }

  async getHistorys(options: IPaginationOptions) {
    const result = await paginate(this.historyRepository, options);
    return result ? result : null;
  }
}
