import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CollectionModule } from 'src/modules/collection/collection.module';
import { List } from 'src/modules/list/entities/list.entity';
import { Offer } from 'src/modules/offer/entities/offer.entity';

import { Nft } from './entities/nft.entity';
import { NftController } from './nft.controller';
import { NftService } from './nft.service';

@Module({
  imports: [TypeOrmModule.forFeature([List, Nft, Offer]), CollectionModule],
  controllers: [NftController],
  providers: [NftService],
  exports: [NftService]
})
export class NftModule {}
