import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ListHistory } from './entities/listHistory.entity';
import { ListHistoryController } from './listHistory.controller';
import { ListHistoryService } from './listHistory.service';

@Module({
  imports: [TypeOrmModule.forFeature([ListHistory])],
  controllers: [ListHistoryController],
  providers: [ListHistoryService]
})
export class ListHistoryModule {}
