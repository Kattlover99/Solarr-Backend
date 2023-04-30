import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { SocketService } from '../socket/socket.service';
import { NftService } from '../nft/nft.service';
import { Offer } from '../offer/entities/offer.entity';
import { Loan } from '../loan/entities/loan.entity';
export declare class NotificationService {
    private notificationRepository;
    private offerRepository;
    private loanRepository;
    private socketService;
    private nftService;
    private readonly logger;
    constructor(notificationRepository: Repository<Notification>, offerRepository: Repository<Offer>, loanRepository: Repository<Loan>, socketService: SocketService, nftService: NftService);
    createNotification(notificationData: any): Promise<Notification>;
    getNotifications(id: string, options: IPaginationOptions): Promise<import("nestjs-typeorm-paginate").Pagination<Notification, import("nestjs-typeorm-paginate").IPaginationMeta>>;
    getNewNotifications(id: string, options: IPaginationOptions): Promise<import("nestjs-typeorm-paginate").Pagination<Notification, import("nestjs-typeorm-paginate").IPaginationMeta>>;
    updateNotification(id: string): Promise<Notification>;
    sendNotification(): Promise<void>;
    handleCron(): void;
}
