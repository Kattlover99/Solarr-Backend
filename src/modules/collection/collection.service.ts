import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';

import { CreateCollectionDto } from './dto/createCollectionDto';
import { Collection } from './entities/collection.entity';

@Injectable()
export class CollectionService {
  constructor(@InjectRepository(Collection) private collectionRepository: Repository<Collection>) {}

  async createCollection(createCollectionDto: CreateCollectionDto): Promise<Collection> {
    const nft = new Collection();
    if (createCollectionDto) {
      nft.name = createCollectionDto.name;
      nft.address = createCollectionDto.address;
    }
    await this.collectionRepository.save(nft);
    return nft;
  }

  async getCollections(options: IPaginationOptions) {
    const result = await paginate(this.collectionRepository, options, { where: { whitelisted: true } });
    return result ? result : null;
  }

  async getCollectionbyAddress(name: string, address: string) {
    let collection = await this.collectionRepository.findOne({ address });
    if (!collection) {
      collection = await this.createCollection({ name, address });
    }
    return collection;
  }
}
