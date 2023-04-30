import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';

import { CreateListHistoryDto } from './dto/createListHistory.dto';
import { ListHistory } from './entities/listHistory.entity';
import { UpdateListHistoryDto } from './dto/updateListHistory.dto';

@Injectable()
export class ListHistoryService {
  constructor(
    @InjectRepository(ListHistory) private listHistoryRepository: Repository<ListHistory>
  ) {}

  async createListHistory(listHistoryDto: CreateListHistoryDto): Promise<ListHistory> {
    const listHistory = new ListHistory();
    if (listHistoryDto) {
      listHistory.action = listHistoryDto.action;
      listHistory.listId = listHistoryDto.listId;
    }
    await this.listHistoryRepository.save(listHistory);
    return listHistory;
  }

  async getListHistorys(options: IPaginationOptions) {
    const result = await paginate(this.listHistoryRepository, options);
    return result ? result : null;
  }

  async updateListHistory(id: string, updateListHistoryDto: UpdateListHistoryDto) {
    await this.listHistoryRepository.update(id, updateListHistoryDto);
    const updatedListHistory = await this.listHistoryRepository.findOne(id);
    if (updatedListHistory) {
      return updatedListHistory;
    }
    throw new HttpException('ListHistory not found', HttpStatus.NOT_FOUND);
  }

  async deleteListHistory(id: string) {
    await this.listHistoryRepository.update(id, { deletedAt: new Date() });
    const deletedListHistory = await this.listHistoryRepository.findOne(id, { withDeleted: true });
    if (deletedListHistory) {
      return { id: deletedListHistory.id };
    }
    throw new HttpException('ListHistory not found', HttpStatus.NOT_FOUND);
  }
}
