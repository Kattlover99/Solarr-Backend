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
exports.Loan = void 0;
const typeorm_1 = require("typeorm");
const core_entity_1 = require("../../../core/typeorm/core.entity");
const user_entity_1 = require("../../user/entities/user.entity");
const offer_entity_1 = require("../../offer/entities/offer.entity");
let Loan = class Loan extends core_entity_1.CoreEntity {
};
__decorate([
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", Number)
], Loan.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'lender_id' }),
    __metadata("design:type", Number)
], Loan.prototype, "lenderId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'borrower_id' }),
    __metadata("design:type", Number)
], Loan.prototype, "borrowerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'collection_address' }),
    __metadata("design:type", String)
], Loan.prototype, "collectionAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'token_id' }),
    __metadata("design:type", String)
], Loan.prototype, "tokenId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'accepted_offer_id' }),
    __metadata("design:type", Number)
], Loan.prototype, "acceptedOfferId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (lender) => lender.id, {
        cascade: ['update', 'remove']
    }),
    (0, typeorm_1.JoinColumn)({ name: 'lender_id' }),
    __metadata("design:type", user_entity_1.User)
], Loan.prototype, "lender", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (borrower) => borrower.id, {
        cascade: ['update', 'remove']
    }),
    (0, typeorm_1.JoinColumn)({ name: 'borrower_id' }),
    __metadata("design:type", user_entity_1.User)
], Loan.prototype, "borrower", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => offer_entity_1.Offer, (offer) => offer.id, {
        cascade: ['update', 'remove']
    }),
    (0, typeorm_1.JoinColumn)({ name: 'accepted_offer_id' }),
    __metadata("design:type", offer_entity_1.Offer)
], Loan.prototype, "offer", void 0);
Loan = __decorate([
    (0, typeorm_1.Entity)('loans')
], Loan);
exports.Loan = Loan;
//# sourceMappingURL=loan.entity.js.map