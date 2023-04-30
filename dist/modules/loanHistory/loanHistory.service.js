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
exports.LoanHistoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
const typeorm_2 = require("typeorm");
const loanHistory_entity_1 = require("./entities/loanHistory.entity");
let LoanHistoryService = class LoanHistoryService {
    constructor(loanHistoryRepository) {
        this.loanHistoryRepository = loanHistoryRepository;
    }
    async createLoanHistory(loanHistoryDto) {
        const loanHistory = new loanHistory_entity_1.LoanHistory();
        if (loanHistoryDto) {
            loanHistory.action = loanHistoryDto.action;
            loanHistory.borrowerId = loanHistoryDto.borrowerId;
            loanHistory.lenderId = loanHistoryDto.lenderId;
            loanHistory.loanId = loanHistoryDto.loanId;
        }
        await this.loanHistoryRepository.save(loanHistory);
        return loanHistory;
    }
    async getLoanHistoryByNft(collectionAddress, tokenId, options) {
        const qb = this.loanHistoryRepository
            .createQueryBuilder('loanHistory')
            .select()
            .innerJoinAndSelect((qb) => qb
            .select('MAX(created_at)', 'latest_time')
            .addSelect('loan_id', 't_loan_id')
            .from(loanHistory_entity_1.LoanHistory, 'loanHistory')
            .groupBy('loan_id'), 'sub', 'sub.t_loan_id = loanHistory.loan_id AND sub.latest_time = loanHistory.created_at')
            .leftJoinAndSelect('loanHistory.borrower', 'borrower')
            .leftJoinAndSelect('loanHistory.lender', 'lender')
            .leftJoinAndSelect('loanHistory.loan', 'loan')
            .leftJoinAndSelect('loan.offer', 'offer')
            .where({
            loan: {
                collectionAddress,
                tokenId
            }
        })
            .orderBy('sub.latest_time', 'DESC');
        const result = await (0, nestjs_typeorm_paginate_1.paginate)(qb, options);
        return result;
    }
    async getLoanHistorys(options) {
        const result = await (0, nestjs_typeorm_paginate_1.paginate)(this.loanHistoryRepository, options);
        return result ? result : null;
    }
    async updateLoanHistory(id, updateLoanHistoryDto) {
        await this.loanHistoryRepository.update(id, updateLoanHistoryDto);
        const updatedLoanHistory = await this.loanHistoryRepository.findOne(id);
        if (updatedLoanHistory) {
            return updatedLoanHistory;
        }
        throw new common_1.HttpException('LoanHistory not found', common_1.HttpStatus.NOT_FOUND);
    }
    async deleteLoanHistory(id) {
        await this.loanHistoryRepository.update(id, { deletedAt: new Date() });
        const deletedLoanHistory = await this.loanHistoryRepository.findOne(id, { withDeleted: true });
        if (deletedLoanHistory) {
            return { id: deletedLoanHistory.id };
        }
        throw new common_1.HttpException('LoanHistory not found', common_1.HttpStatus.NOT_FOUND);
    }
};
LoanHistoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(loanHistory_entity_1.LoanHistory)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], LoanHistoryService);
exports.LoanHistoryService = LoanHistoryService;
//# sourceMappingURL=loanHistory.service.js.map