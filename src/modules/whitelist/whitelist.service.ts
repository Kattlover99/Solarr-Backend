import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';

import { CreateWhitelistDto } from './dto/createWhitelist.dto';
import { Whitelist } from './entities/whitelist.entity';

@Injectable()
export class WhitelistService {
  constructor(
    @InjectRepository(Whitelist) private whitelistRepository: Repository<Whitelist>,
  ) {}

  async createWhitelist(createWhitelistDto: CreateWhitelistDto): Promise<Whitelist> {
    const whitelist = new Whitelist();
    if (createWhitelistDto) {
      whitelist.collectionAddress = createWhitelistDto.collectionAddress;
      whitelist.tokenId = createWhitelistDto.tokenId;
    }
    await this.whitelistRepository.save(whitelist);
    return whitelist;
  }

  async getWhitelists(options: IPaginationOptions) {
    const result = await paginate(this.whitelistRepository, options);
    return result ? result : null;
  }
}
