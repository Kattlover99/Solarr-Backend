import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'src/modules/auth/auth.module';
import { S3Module } from 'src/modules/s3/s3.module';
import { List } from '../list/entities/list.entity';
import { Notification } from '../notification/entities/notification.entity';
import { Loan } from '../loan/entities/loan.entity';
import { LoanHistory } from '../loanHistory/entities/loanHistory.entity';
import { NotificationModule } from '../notification/notification.module';
import { Offer } from '../offer/entities/offer.entity';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, List, Offer, LoanHistory, Notification, Offer, Loan]), AuthModule, S3Module, NotificationModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
