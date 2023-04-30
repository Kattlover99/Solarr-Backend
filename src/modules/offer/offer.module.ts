import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Nft } from '../nft/entities/nft.entity';
import { Offer } from './entities/offer.entity';
import { OfferController } from './offer.controller';
import { OfferService } from './offer.service';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [TypeOrmModule.forFeature([Nft, Offer]), NotificationModule],
  controllers: [OfferController],
  providers: [OfferService]
})
export class OfferModule {}
