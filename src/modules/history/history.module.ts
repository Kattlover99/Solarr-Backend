import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { History } from './entities/history.entity';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';

@Module({
  imports: [TypeOrmModule.forFeature([History])],
  controllers: [HistoryController],
  providers: [HistoryService]
})
export class HistoryModule {}
