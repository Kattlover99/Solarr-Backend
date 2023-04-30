import { NotificationService } from './notification.service';
export declare class NotificationController {
    private notificationService;
    constructor(notificationService: NotificationService);
    getNotifications(page: number, limit: number, request: any): Promise<import("nestjs-typeorm-paginate").Pagination<import("./entities/notification.entity").Notification, import("nestjs-typeorm-paginate").IPaginationMeta>>;
    getNewNotifications(page: number, limit: number, request: any): Promise<import("nestjs-typeorm-paginate").Pagination<import("./entities/notification.entity").Notification, import("nestjs-typeorm-paginate").IPaginationMeta>>;
    updateNotification(id: string): Promise<import("./entities/notification.entity").Notification>;
}
