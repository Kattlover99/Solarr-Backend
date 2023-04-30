import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LoanHistory } from './entities/loanHistory.entity';
import { LoanHistoryController } from './loanHistory.controller';
import { LoanHistoryService } from './loanHistory.service';

@Module({
  imports: [TypeOrmModule.forFeature([LoanHistory])],
  controllers: [LoanHistoryController],
  providers: [LoanHistoryService],
  exports: [LoanHistoryService]
})
export class LoanHistoryModule {}
