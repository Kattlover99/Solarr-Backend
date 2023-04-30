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
exports.LoanController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../auth/guard/auth.guard");
const loan_service_1 = require("./loan.service");
const loan_dto_1 = require("./dto/loan.dto");
const updateLoan_dto_1 = require("./dto/updateLoan.dto");
const loansNftQuery_dto_1 = require("./dto/loansNftQuery.dto");
const loanLiquifiedQuery_dto_1 = require("./dto/loanLiquifiedQuery.dto");
const loanSuppliedQuery_dto_1 = require("./dto/loanSuppliedQuery.dto");
let LoanController = class LoanController {
    constructor(loanService) {
        this.loanService = loanService;
    }
    async createLoan(loanDto) {
        return this.loanService.createLoan(loanDto);
    }
    async getLoans(page = 1, limit = 20) {
        return this.loanService.getLoans({
            page,
            limit
        });
    }
    async getLoansOfNft(collectionAddress, tokenId, page = 1, limit = 6) {
        return this.loanService.getLoansOfNft(collectionAddress, tokenId, {
            page,
            limit
        });
    }
    async getLoansLiquified(borrowerId, page = 1, limit = 8) {
        return this.loanService.getLoansLiquified(borrowerId, {
            page,
            limit
        });
    }
    async getLoansSupplied(lenderId, page = 1, limit = 8) {
        return this.loanService.getLoansSupplied(lenderId, {
            page,
            limit
        });
    }
    async getLoan(borrowerId, collectionAddress, tokenId, state = 0) {
        return this.loanService.getLoan(borrowerId, collectionAddress, tokenId, state);
    }
    async updateLoan(id, updateLoanDto) {
        return this.loanService.updateLoan(id, updateLoanDto);
    }
    async deleteLoan(id) {
        return this.loanService.deleteLoan(id);
    }
};
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthenticationGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [loan_dto_1.LoanDto]),
    __metadata("design:returntype", Promise)
], LoanController.prototype, "createLoan", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthenticationGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(20), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], LoanController.prototype, "getLoans", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthenticationGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiQuery)({ type: loansNftQuery_dto_1.LoansNftQueryDto }),
    (0, common_1.Get)('/nft'),
    __param(0, (0, common_1.Query)('collectionAddress')),
    __param(1, (0, common_1.Query)('tokenId')),
    __param(2, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(3, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(6), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], LoanController.prototype, "getLoansOfNft", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthenticationGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiQuery)({ type: loanLiquifiedQuery_dto_1.LoanLiquifiedQueryDto }),
    (0, common_1.Get)('/liquified'),
    __param(0, (0, common_1.Query)('borrowerId')),
    __param(1, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(8), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], LoanController.prototype, "getLoansLiquified", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthenticationGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiQuery)({ type: loanSuppliedQuery_dto_1.LoanSuppliedQueryDto }),
    (0, common_1.Get)('/supplied'),
    __param(0, (0, common_1.Query)('lenderId')),
    __param(1, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(8), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], LoanController.prototype, "getLoansSupplied", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthenticationGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('/detail'),
    __param(0, (0, common_1.Query)('borrowerId')),
    __param(1, (0, common_1.Query)('collectionAddress')),
    __param(2, (0, common_1.Query)('tokenId')),
    __param(3, (0, common_1.Query)('state', new common_1.DefaultValuePipe(0), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], LoanController.prototype, "getLoan", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthenticationGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Patch)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, updateLoan_dto_1.UpdateLoanDto]),
    __metadata("design:returntype", Promise)
], LoanController.prototype, "updateLoan", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthenticationGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LoanController.prototype, "deleteLoan", null);
LoanController = __decorate([
    (0, swagger_1.ApiTags)('Loan'),
    (0, common_1.Controller)('loan'),
    __metadata("design:paramtypes", [loan_service_1.LoanService])
], LoanController);
exports.LoanController = LoanController;
//# sourceMappingURL=loan.controller.js.map