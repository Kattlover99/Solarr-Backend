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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoanHistory = void 0;
const typeorm_1 = require("typeorm");
const core_entity_1 = require("../../../core/typeorm/core.entity");
const loan_entity_1 = require("../../loan/entities/loan.entity");
const user_entity_1 = require("../../user/entities/user.entity");
let LoanHistory = class LoanHistory extends core_entity_1.CoreEntity {
};
__decorate([
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", Number)
], LoanHistory.prototype, "action", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'lender_id' }),
    __metadata("design:type", Number)
], LoanHistory.prototype, "lenderId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'borrower_id' }),
    __metadata("design:type", Number)
], LoanHistory.prototype, "borrowerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'loan_id' }),
    __metadata("design:type", Number)
], LoanHistory.prototype, "loanId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (lender) => lender.id, {
        cascade: ['update', 'remove']
    }),
    (0, typeorm_1.JoinColumn)({ name: 'lender_id' }),
    __metadata("design:type", user_entity_1.User)
], LoanHistory.prototype, "lender", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (borrower) => borrower.id, {
        cascade: ['update', 'remove']
    }),
    (0, typeorm_1.JoinColumn)({ name: 'borrower_id' }),
    __metadata("design:type", user_entity_1.User)
], LoanHistory.prototype, "borrower", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => loan_entity_1.Loan, (loan) => loan.id, {
        cascade: ['update', 'remove']
    }),
    (0, typeorm_1.JoinColumn)({ name: 'loan_id' }),
    __metadata("design:type", loan_entity_1.Loan)
], LoanHistory.prototype, "loan", void 0);
LoanHistory = __decorate([
    (0, typeorm_1.Entity)('loanhistory')
], LoanHistory);
exports.LoanHistory = LoanHistory;
//# sourceMappingURL=loanHistory.entity.js.map