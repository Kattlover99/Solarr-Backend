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
exports.LoanService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
const typeorm_2 = require("typeorm");
const loan_entity_1 = require("./entities/loan.entity");
const loanHistory_service_1 = require("../loanHistory/loanHistory.service");
const createLoanHistory_dto_1 = require("../loanHistory/dto/createLoanHistory.dto");
const notification_service_1 = require("../notification/notification.service");
const contants_1 = require("../../utils/contants");
const nft_entity_1 = require("../nft/entities/nft.entity");
const contants_2 = require("../../utils/contants");
const offer_entity_1 = require("../offer/entities/offer.entity");
const list_entity_1 = require("../list/entities/list.entity");
let LoanService = class LoanService {
    constructor(listRepository, loanRepository, nftRepository, offerRepository, loanHistoryService, notificationService) {
        this.listRepository = listRepository;
        this.loanRepository = loanRepository;
        this.nftRepository = nftRepository;
        this.offerRepository = offerRepository;
        this.loanHistoryService = loanHistoryService;
        this.notificationService = notificationService;
    }
    async createLoan(loanDto) {
        const loan = new loan_entity_1.Loan();
        const loanHistory = new createLoanHistory_dto_1.CreateLoanHistoryDto();
        if (loanDto) {
            loan.state = 0;
            loan.lenderId = loanDto.lenderId;
            loan.borrowerId = loanDto.borrowerId;
            loan.collectionAddress = loanDto.collectionAddress;
            loan.tokenId = loanDto.tokenId;
            loan.acceptedOfferId = loanDto.acceptedOfferId;
        }
        const newLoan = await this.loanRepository.save(loan);
        if (newLoan && newLoan.id) {
            const list = await this.listRepository.findOne({
                where: {
                    tokenId: newLoan.tokenId,
                    collectionAddress: newLoan.collectionAddress,
                    borrowerId: newLoan.borrowerId
                }
            });
            if (list) {
                await this.listRepository.update(list.id, { deletedAt: new Date() });
            }
            await this.offerRepository.update(newLoan.acceptedOfferId, { state: 1 });
            const unacceptedOffers = await this.offerRepository.find({
                where: { tokenId: newLoan.tokenId, collectionAddress: newLoan.collectionAddress, state: 0 }
            });
            if (unacceptedOffers && unacceptedOffers.length) {
                const unacceptedOffersIds = unacceptedOffers.map((offer) => offer.id);
                await this.offerRepository.update({ id: (0, typeorm_2.In)(unacceptedOffersIds) }, { deletedAt: new Date() });
            }
            loanHistory.action = 0;
            loanHistory.lenderId = loanDto.lenderId;
            loanHistory.borrowerId = loanDto.borrowerId;
            loanHistory.loanId = newLoan.id;
            await this.loanHistoryService.createLoanHistory(loanHistory);
            await this.notificationService.createNotification({
                status: contants_1.NOTIFICATION_STATUS.LOAN,
                userId: loanDto.borrowerId,
                collectionAddress: loanDto.collectionAddress,
                tokenId: loanDto.tokenId
            });
            await this.notificationService.createNotification({
                status: 2,
                userId: loanDto.lenderId,
                collectionAddress: loanDto.collectionAddress,
                tokenId: loanDto.tokenId
            });
        }
        return newLoan;
    }
    async getLoans(options) {
        const loans = await this.loanRepository
            .createQueryBuilder('loan')
            .select()
            .where('deleted_at IS NULL');
        const result = await (0, nestjs_typeorm_paginate_1.paginate)(loans, options);
        return result ? result : null;
    }
    async getLoansOfNft(collectionAddress, tokenId, options) {
        const result = await (0, nestjs_typeorm_paginate_1.paginate)(this.loanRepository, options, {
            relations: ['lender', 'borrower', 'offer'],
            where: {
                collectionAddress,
                tokenId
            },
            order: { createdAt: 'DESC' }
        });
        return result;
    }
    async getLoansLiquified(borrowerId, options) {
        const results = await (0, nestjs_typeorm_paginate_1.paginate)(this.loanRepository, options, {
            relations: ['borrower', 'lender', 'offer'],
            where: { borrowerId },
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
    async getLoansSupplied(lenderId, options) {
        const results = await (0, nestjs_typeorm_paginate_1.paginate)(this.loanRepository, options, {
            relations: ['borrower', 'lender', 'offer'],
            where: { lenderId },
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
    async getLoan(borrowerId, collectionAddress, tokenId, state) {
        const loan = await this.loanRepository.findOne({
            relations: ['offer'],
            where: { borrowerId, collectionAddress, tokenId, state }
        });
        return loan ? loan : null;
    }
    async updateLoan(id, updateLoanDto) {
        const { state } = updateLoanDto;
        await this.loanRepository.update(id, updateLoanDto);
        const updatedLoan = await this.loanRepository.findOne(id);
        if (updatedLoan) {
            if (state == contants_2.ILoanState.BREACHED) {
                const offer = await this.offerRepository.findOne(updatedLoan.acceptedOfferId);
                if (offer) {
                    const nft = await this.nftRepository.findOne({
                        relations: ['collection'],
                        where: {
                            collection: { address: offer.collectionAddress },
                            tokenId: offer.tokenId
                        }
                    });
                    if (nft)
                        this.nftRepository.update(nft.id, { ownerId: offer.lenderId });
                }
            }
            const loanHistory = new createLoanHistory_dto_1.CreateLoanHistoryDto();
            loanHistory.action = state;
            loanHistory.lenderId = updatedLoan.lenderId;
            loanHistory.borrowerId = updatedLoan.borrowerId;
            loanHistory.loanId = updatedLoan.id;
            await this.loanHistoryService.createLoanHistory(loanHistory);
            if (state === contants_2.ILoanState.RETURNED) {
                await this.notificationService.createNotification({
                    status: 3,
                    userId: updatedLoan.borrowerId,
                    collectionAddress: updatedLoan.collectionAddress,
                    tokenId: updatedLoan.tokenId
                });
                await this.notificationService.createNotification({
                    status: 4,
                    userId: updatedLoan.lenderId,
                    collectionAddress: updatedLoan.collectionAddress,
                    tokenId: updatedLoan.tokenId
                });
            }
            else if (state === contants_2.ILoanState.BREACHED) {
                await this.notificationService.createNotification({
                    status: 8,
                    userId: updatedLoan.lenderId,
                    collectionAddress: updatedLoan.collectionAddress,
                    tokenId: updatedLoan.tokenId
                });
            }
            return updatedLoan;
        }
        throw new common_1.HttpException('Loan not found', common_1.HttpStatus.NOT_FOUND);
    }
    async deleteLoan(id) {
        await this.loanRepository.update(id, { deletedAt: new Date() });
        const deletedLoan = await this.loanRepository.findOne(id, { withDeleted: true });
        if (deletedLoan) {
            return { id: deletedLoan.id };
        }
        throw new common_1.HttpException('Loan not found', common_1.HttpStatus.NOT_FOUND);
    }
};
LoanService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(list_entity_1.List)),
    __param(1, (0, typeorm_1.InjectRepository)(loan_entity_1.Loan)),
    __param(2, (0, typeorm_1.InjectRepository)(nft_entity_1.Nft)),
    __param(3, (0, typeorm_1.InjectRepository)(offer_entity_1.Offer)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        loanHistory_service_1.LoanHistoryService,
        notification_service_1.NotificationService])
], LoanService);
exports.LoanService = LoanService;
//# sourceMappingURL=loan.service.js.map