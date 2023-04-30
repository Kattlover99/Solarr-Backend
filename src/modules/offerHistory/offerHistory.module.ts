import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OfferHistory } from './entities/offerHistory.entity';
import { OfferHistoryController } from './offerHistory.controller';
import { OfferHistoryService } from './offerHistory.service';

@Module({
  imports: [TypeOrmModule.forFeature([OfferHistory])],
  controllers: [OfferHistoryController],
  providers: [OfferHistoryService]
})
export class OfferHistoryModule {}
