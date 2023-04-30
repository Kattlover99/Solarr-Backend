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
exports.LoanHistoryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../auth/guard/auth.guard");
const loanHistory_service_1 = require("./loanHistory.service");
const createLoanHistory_dto_1 = require("./dto/createLoanHistory.dto");
const updateLoanHistory_1 = require("./dto/updateLoanHistory");
const loanHistoryNftQuery_dto_1 = require("./dto/loanHistoryNftQuery.dto");
let LoanHistoryController = class LoanHistoryController {
    constructor(loanHistoryService) {
        this.loanHistoryService = loanHistoryService;
    }
    async mint(request, createLoanHistoryDto) {
        return this.loanHistoryService.createLoanHistory(createLoanHistoryDto);
    }
    async getLoanHistoryByNft(collectionAddress, tokenId, page = 1, limit = 6) {
        return this.loanHistoryService.getLoanHistoryByNft(collectionAddress, tokenId, {
            page,
            limit
        });
    }
    async getTransactionByAction(page = 1, limit = 20) {
        return this.loanHistoryService.getLoanHistorys({
            page,
            limit
        });
    }
    async updateLoanHistory(id, updateLoanHistoryDto) {
        return this.loanHistoryService.updateLoanHistory(id, updateLoanHistoryDto);
    }
    async deleteLoanHistory(id) {
        return this.loanHistoryService.deleteLoanHistory(id);
    }
};
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthenticationGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, createLoanHistory_dto_1.CreateLoanHistoryDto]),
    __metadata("design:returntype", Promise)
], LoanHistoryController.prototype, "mint", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthenticationGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiQuery)({ type: loanHistoryNftQuery_dto_1.LoanHistoryNftQueryDto }),
    (0, common_1.Get)('/nft'),
    __param(0, (0, common_1.Query)('collectionAddress')),
    __param(1, (0, common_1.Query)('tokenId')),
    __param(2, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(3, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(6), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], LoanHistoryController.prototype, "getLoanHistoryByNft", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthenticationGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(20), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], LoanHistoryController.prototype, "getTransactionByAction", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthenticationGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Patch)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, updateLoanHistory_1.UpdateLoanHistoryDto]),
    __metadata("design:returntype", Promise)
], LoanHistoryController.prototype, "updateLoanHistory", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthenticationGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LoanHistoryController.prototype, "deleteLoanHistory", null);
LoanHistoryController = __decorate([
    (0, swagger_1.ApiTags)('LoanHistory'),
    (0, common_1.Controller)('loan-history'),
    __metadata("design:paramtypes", [loanHistory_service_1.LoanHistoryService])
], LoanHistoryController);
exports.LoanHistoryController = LoanHistoryController;
//# sourceMappingURL=loanHistory.controller.js.map