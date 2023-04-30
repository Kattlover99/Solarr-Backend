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
exports.Offer = void 0;
const typeorm_1 = require("typeorm");
const core_entity_1 = require("../../../core/typeorm/core.entity");
const user_entity_1 = require("../../user/entities/user.entity");
let Offer = class Offer extends core_entity_1.CoreEntity {
};
__decorate([
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", Number)
], Offer.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { name: 'loan_amount', default: null, precision: 32, scale: 16 }),
    __metadata("design:type", Number)
], Offer.prototype, "loanAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", Number)
], Offer.prototype, "period", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null, precision: 32, scale: 16 }),
    __metadata("design:type", Number)
], Offer.prototype, "apr", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'loan_type' }),
    __metadata("design:type", Boolean)
], Offer.prototype, "loanType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'lender_id', default: null }),
    __metadata("design:type", Number)
], Offer.prototype, "lenderId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'borrower_id', default: null }),
    __metadata("design:type", Number)
], Offer.prototype, "borrowerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'collection_address' }),
    __metadata("design:type", String)
], Offer.prototype, "collectionAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'token_id' }),
    __metadata("design:type", String)
], Offer.prototype, "tokenId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (lender) => lender.id, {
        cascade: ['update', 'remove']
    }),
    (0, typeorm_1.JoinColumn)({ name: 'lender_id' }),
    __metadata("design:type", user_entity_1.User)
], Offer.prototype, "lender", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (borrower) => borrower.id, {
        cascade: ['update', 'remove']
    }),
    (0, typeorm_1.JoinColumn)({ name: 'borrower_id' }),
    __metadata("design:type", user_entity_1.User)
], Offer.prototype, "borrower", void 0);
Offer = __decorate([
    (0, typeorm_1.Entity)('offers')
], Offer);
exports.Offer = Offer;
//# sourceMappingURL=offer.entity.js.map