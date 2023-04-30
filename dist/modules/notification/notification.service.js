"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var NotificationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
const typeorm_2 = require("typeorm");
const luxon_1 = require("luxon");
const notification_entity_1 = require("./entities/notification.entity");
const socket_service_1 = require("../socket/socket.service");
const nft_service_1 = require("../nft/nft.service");
const offer_entity_1 = require("../offer/entities/offer.entity");
const loan_entity_1 = require("../loan/entities/loan.entity");
let NotificationService = NotificationService_1 = class NotificationService {
    constructor(notificationRepository, offerRepository, loanRepository, socketService, nftService) {
        this.notificationRepository = notificationRepository;
        this.offerRepository = offerRepository;
        this.loanRepository = loanRepository;
        this.socketService = socketService;
        this.nftService = nftService;
        this.logger = new common_1.Logger(NotificationService_1.name);
    }
    async createNotification(notificationData) {
        const notification = new notification_entity_1.Notification();
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
    async getNotifications(id, options) {
        const notifications = await this.notificationRepository
            .createQueryBuilder()
            .select()
            .where({ userId: id })
            .orderBy('created_at', 'DESC');
        const result = await (0, nestjs_typeorm_paginate_1.paginate)(notifications, options);
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
    async getNewNotifications(id, options) {
        const notifications = await this.notificationRepository
            .createQueryBuilder()
            .select()
            .where({ userId: id, isRead: false })
            .orderBy('created_at', 'DESC');
        const result = await (0, nestjs_typeorm_paginate_1.paginate)(notifications, options);
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
    async updateNotification(id) {
        await this.notificationRepository.update(id, { isRead: true });
        const updatedNotification = await this.notificationRepository.findOne(id);
        if (updatedNotification) {
            return updatedNotification;
        }
        throw new common_1.HttpException('Notification not found', common_1.HttpStatus.NOT_FOUND);
    }
    async sendNotification() {
        const offers = await this.offerRepository.find({ where: { state: 1 } });
        if (offers.length) {
            for (const offer of offers) {
                const loan = await this.loanRepository.findOne({ where: { acceptedOfferId: offer.id } });
                if (loan) {
                    const dueDate = luxon_1.DateTime.fromISO(loan.createdAt.toISOString()).plus({
                        minutes: offer.period
                    });
                    const remainObject = dueDate.diffNow('minutes').toObject();
                    const remainDays = remainObject.minutes ? Math.ceil(remainObject.minutes) : 0;
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
    handleCron() {
        this.logger.debug('Called everyminute');
        this.sendNotification();
    }
};
__decorate([
    (0, schedule_1.Cron)('0 * * * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NotificationService.prototype, "handleCron", null);
NotificationService = NotificationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(notification_entity_1.Notification)),
    __param(1, (0, typeorm_1.InjectRepository)(offer_entity_1.Offer)),
    __param(2, (0, typeorm_1.InjectRepository)(loan_entity_1.Loan)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        socket_service_1.SocketService,
        nft_service_1.NftService])
], NotificationService);
exports.NotificationService = NotificationService;
//# sourceMappingURL=notification.service.js.map