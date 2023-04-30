import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { Not, Repository } from 'typeorm';
import { DateTime } from 'luxon';

import { Notification } from './entities/notification.entity';
import { SocketService } from '../socket/socket.service';
import { NftService } from '../nft/nft.service';
import { Offer } from '../offer/entities/offer.entity';
import { Loan } from '../loan/entities/loan.entity';


@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);
  
  constructor(
    @InjectRepository(Notification) private notificationRepository: Repository<Notification>,
    @InjectRepository(Offer) private offerRepository: Repository<Offer>,
    @InjectRepository(Loan) private loanRepository: Repository<Loan>,
    private socketService: SocketService,
    private nftService: NftService
  ) {}

  async createNotification(notificationData): Promise<Notification> {
    const notification = new Notification();
    if (notificationData) {
      notification.status = notificationData.status;
      notification.userId = notificationData.userId;
      notification.collectionAddress = notificationData.collectionAddress;
      notification.tokenId = notificationData.tokenId;
    }
    await this.notificationRepository
      .save(notification)
      .then(async (res) => {
        this.socketService.send({
          userId: res.userId
        });
      })
      .catch((res) => {
        throw res;
      });
    return notification;
  }

  async getNotifications(id: string, options: IPaginationOptions) {
    const notifications = await this.notificationRepository
      .createQueryBuilder()
      .select()
      .where({ userId: id })
      .orderBy('created_at', 'DESC');
    const result = await paginate(notifications, options);
    for (const el of result.items) {
      const nft = await this.nftService.getNft(el.collectionAddress, el.tokenId);
      if (nft) {
        const image = JSON.parse(nft.metadata).image;
        el.imageUrl = image;
      }
      el.timeDifference = new Date().getTime() - new Date(el.createdAt).getTime();
    }
    return result ? result : null;
  }

  async getNewNotifications(id: string, options: IPaginationOptions) {
    const notifications = await this.notificationRepository
      .createQueryBuilder()
      .select()
      .where({ userId: id, isRead: false })
      .orderBy('created_at', 'DESC');
    const result = await paginate(notifications, options);
    for (const el of result.items) {
      const nft = await this.nftService.getNft(el.collectionAddress, el.tokenId);
      if (nft) {
        const image = JSON.parse(nft.metadata).image;
        el.imageUrl = image;
      }
      el.timeDifference = new Date().getTime() - new Date(el.createdAt).getTime();
    }
    return result ? result : null;
  }

  async updateNotification(id: string) {
    await this.notificationRepository.update(id, { isRead: true });
    const updatedNotification = await this.notificationRepository.findOne(id);
    if (updatedNotification) {
      return updatedNotification;
    }
    throw new HttpException('Notification not found', HttpStatus.NOT_FOUND);
  }

  async sendNotification() {
    const offers = await this.offerRepository.find({ where: { state: 1 } });
    if (offers.length) {
      for (const offer of offers) {
        const loan = await this.loanRepository.findOne({ where: { acceptedOfferId: offer.id } });
        if (loan) {

          const dueDate = DateTime.fromISO(loan.createdAt.toISOString()).plus({
            minutes: offer.period
            // days: parseInt(period as string)
          })
          const remainObject = dueDate.diffNow('minutes').toObject()
          // const remainObject = dueDate.diffNow('days').toObject()
        
          const remainDays = remainObject.minutes ? Math.ceil(remainObject.minutes) : 0

          if (remainDays === 3) {
            await this.createNotification({
              status: 7,
              userId: loan.borrowerId,
              collectionAddress: offer.collectionAddress,
              tokenId: offer.tokenId
            });
          }
          if (!remainDays) {
            await this.createNotification({
              status: 5,
              userId: loan.borrowerId,
              collectionAddress: offer.collectionAddress,
              tokenId: offer.tokenId
            });
            await this.createNotification({
              status: 6,
              userId: loan.lenderId,
              collectionAddress: offer.collectionAddress,
              tokenId: offer.tokenId
            });
          }
        }
      }
    }
  }

  @Cron('0 * * * * *')
  handleCron() {
    this.logger.debug('Called everyminute');
    this.sendNotification();
  }
}
