import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CollectionModule } from 'src/modules/collection/collection.module';
import { NftModule } from '../nft/nft.module';
import { Offer } from '../offer/entities/offer.entity';
import { Collection } from '../collection/entities/collection.entity';
import { List } from './entities/list.entity';
import { ListController } from './list.controller';
import { ListService } from './list.service';

@Module({
  imports: [TypeOrmModule.forFeature([List, Offer, Collection]), CollectionModule, NftModule],
  controllers: [ListController],
  providers: [ListService],
  exports: [ListService]
})
export class ListModule {}
