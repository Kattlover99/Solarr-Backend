import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List } from '../list/entities/list.entity';
import { LoanHistoryModule } from '../loanHistory/loanHistory.module';
import { Nft } from '../nft/entities/nft.entity';
import { Offer } from '../offer/entities/offer.entity';

import { Loan } from './entities/loan.entity';
import { LoanController } from './loan.controller';
import { LoanService } from './loan.service';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [TypeOrmModule.forFeature([List, Loan, Nft, Offer]), LoanHistoryModule, NotificationModule],
  controllers: [LoanController],
  providers: [LoanService]
})
export class LoanModule {}
