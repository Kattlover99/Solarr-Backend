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
exports.OfferHistory = void 0;
const typeorm_1 = require("typeorm");
const core_entity_1 = require("../../../core/typeorm/core.entity");
const offer_entity_1 = require("../../offer/entities/offer.entity");
let OfferHistory = class OfferHistory extends core_entity_1.CoreEntity {
};
__decorate([
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", Number)
], OfferHistory.prototype, "action", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'offer_id' }),
    __metadata("design:type", Number)
], OfferHistory.prototype, "offerId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => offer_entity_1.Offer, (offer) => offer.id, {
        cascade: ['update', 'remove']
    }),
    (0, typeorm_1.JoinColumn)({ name: 'offer_id' }),
    __metadata("design:type", offer_entity_1.Offer)
], OfferHistory.prototype, "offer", void 0);
OfferHistory = __decorate([
    (0, typeorm_1.Entity)('offerhistory')
], OfferHistory);
exports.OfferHistory = OfferHistory;
//# sourceMappingURL=offerHistory.entity.js.map