import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { S3Module } from './modules/s3/s3.module';
import { UserModule } from './modules/user/user.module';
import { NftModule } from './modules/nft/nft.module';
import { FaqModule } from './modules/faq/faq.module';
import { CollectionModule } from './modules/collection/collection.module';
import { ListModule } from './modules/list/list.module';
import { LoanModule } from './modules/loan/loan.module';
import { OfferModule } from './modules/offer/offer.module';
import { HistoryModule } from './modules/history/history.module';
import { WhitelistModule } from './modules/whitelist/whitelist.module';
import { NotificationModule } from './modules/notification/notification.module';
import { LoanHistoryModule } from './modules/loanHistory/loanHistory.module';
import { ListHistoryModule } from './modules/listHistory/listHistory.module';
import { OfferHistoryModule } from './modules/offerHistory/offerHistory.module';
import { SocketModule } from './modules/socket/socket.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService) => configService.typeOrmConfig,
      inject: [ConfigService]
    }),
    ScheduleModule.forRoot(),
    S3Module,
    UserModule,
    NftModule,
    FaqModule,
    CollectionModule,
    ListModule,
    LoanModule,
    OfferModule,
    HistoryModule,
    WhitelistModule,
    NotificationModule,
    LoanHistoryModule,
    ListHistoryModule,
    OfferHistoryModule,
    SocketModule,
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
