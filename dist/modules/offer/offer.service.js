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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
const typeorm_2 = require("typeorm");
const offer_entity_1 = require("./entities/offer.entity");
const nft_entity_1 = require("../nft/entities/nft.entity");
const notification_service_1 = require("../notification/notification.service");
const contants_1 = require("../../utils/contants");
let OfferService = class OfferService {
    constructor(offerRepository, nftRepository, notificationService) {
        this.offerRepository = offerRepository;
        this.nftRepository = nftRepository;
        this.notificationService = notificationService;
    }
    async createOffer(offerDto) {
        const offer = new offer_entity_1.Offer();
        if (offerDto) {
            offer.state = 0;
            offer.loanAmount = offerDto.loanAmount;
            offer.period = offerDto.period;
            offer.apr = offerDto.apr;
            offer.loanType = offerDto.loanType;
            offer.lenderId = offerDto.lenderId;
            offer.borrowerId = offerDto.borrowerId;
            offer.collectionAddress = offerDto.collectionAddress;
            offer.tokenId = offerDto.tokenId;
        }
        await this.offerRepository
            .save(offer)
            .then(async (res) => {
            await this.notificationService.createNotification({
                status: contants_1.NOTIFICATION_STATUS.OFFERED,
                userId: res.borrowerId,
                collectionAddress: res.collectionAddress,
                tokenId: res.tokenId
            });
        })
            .catch((error) => {
            throw error;
        });
        return offer;
    }
    async getOffers(options) {
        const offers = await this.offerRepository
            .createQueryBuilder('offer')
            .select()
            .where('deleted_at IS NULL');
        const result = await (0, nestjs_typeorm_paginate_1.paginate)(offers, options);
        return result ? result : null;
    }
    async getOffer(lenderId, collectionAddress, tokenId, state) {
        const result = await this.offerRepository.findOne({
            where: { lenderId, collectionAddress, tokenId, state }
        });
        return result ? result : null;
    }
    async getOffersNft(collectionAddress, tokenId, options) {
        const results = await (0, nestjs_typeorm_paginate_1.paginate)(this.offerRepository, options, {
            relations: ['lender', 'borrower'],
            where: { collectionAddress, tokenId, state: 0 },
            order: { createdAt: 'DESC' }
        });
        if (results && results.items) {
            for (const offer of results.items) {
                const nft = await this.nftRepository.findOne({
                    where: { ownerId: offer.borrowerId, tokenId: offer.tokenId }
                });
                offer['nft'] = nft;
            }
            return results;
        }
        throw new common_1.HttpException('No data', common_1.HttpStatus.NOT_FOUND);
    }
    async getOffersReceived(borrowerId, options) {
        const results = await (0, nestjs_typeorm_paginate_1.paginate)(this.offerRepository, options, {
            relations: ['borrower', 'lender'],
            where: { borrowerId, state: 0 },
            order: { createdAt: 'DESC' }
        });
        console.log("results: ", results);
        if (results && results.items) {
            for (const offer of results.items) {
                const nft = await this.nftRepository.findOne({
                    relations: ['collection'],
                    where: { collection: { address: offer.collectionAddress }, tokenId: offer.tokenId }
                });
                offer['nft'] = nft;
            }
            return results;
        }
        throw new common_1.HttpException('No data', common_1.HttpStatus.NOT_FOUND);
    }
    async getOffersMade(lenderId, options) {
        const results = await (0, nestjs_typeorm_paginate_1.paginate)(this.offerRepository, options, {
            relations: ['borrower', 'lender'],
            where: { lenderId, state: 0 },
            order: { createdAt: 'DESC' }
        });
        if (results && results.items) {
            for (const offer of results.items) {
                const nft = await this.nftRepository.findOne({
                    relations: ['collection'],
                    where: { collection: { address: offer.collectionAddress }, tokenId: offer.tokenId }
                });
                offer['nft'] = nft;
            }
            return results;
        }
        throw new common_1.HttpException('No data', common_1.HttpStatus.NOT_FOUND);
    }
    async updateOffer(id, updateOfferDto) {
        await this.offerRepository.update(id, updateOfferDto);
        const updatedOffer = await this.offerRepository.findOne(id);
        if (updatedOffer) {
            return updatedOffer;
        }
        throw new common_1.HttpException('Offer not found', common_1.HttpStatus.NOT_FOUND);
    }
    async deleteOffer(id) {
        await this.offerRepository.update(id, { deletedAt: new Date() });
        const deletedOffer = await this.offerRepository.findOne(id, { withDeleted: true });
        if (deletedOffer) {
            return { id: deletedOffer.id };
        }
        throw new common_1.HttpException('Offer not found', common_1.HttpStatus.NOT_FOUND);
    }
};
OfferService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(offer_entity_1.Offer)),
    __param(1, (0, typeorm_1.InjectRepository)(nft_entity_1.Nft)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        notification_service_1.NotificationService])
], OfferService);
exports.OfferService = OfferService;
//# sourceMappingURL=offer.service.js.map