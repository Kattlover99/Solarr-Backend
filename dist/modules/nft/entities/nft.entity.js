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
exports.Nft = void 0;
const typeorm_1 = require("typeorm");
const core_entity_1 = require("../../../core/typeorm/core.entity");
const collection_entity_1 = require("../../collection/entities/collection.entity");
const user_entity_1 = require("../../user/entities/user.entity");
let Nft = class Nft extends core_entity_1.CoreEntity {
};
__decorate([
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], Nft.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'token_id', default: null }),
    __metadata("design:type", String)
], Nft.prototype, "tokenId", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", Number)
], Nft.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { default: null }),
    __metadata("design:type", String)
], Nft.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'collection_floor', default: null }),
    __metadata("design:type", Number)
], Nft.prototype, "collectionFloor", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'back_valuation', default: null }),
    __metadata("design:type", Number)
], Nft.prototype, "bankValuation", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'owner_id' }),
    __metadata("design:type", Number)
], Nft.prototype, "ownerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'collection_id' }),
    __metadata("design:type", Number)
], Nft.prototype, "collectionId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (owner) => owner.id, {
        cascade: ['update', 'remove']
    }),
    (0, typeorm_1.JoinColumn)({ name: 'owner_id' }),
    __metadata("design:type", user_entity_1.User)
], Nft.prototype, "owner", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => collection_entity_1.Collection, (collection) => collection.id, {
        cascade: ['update', 'remove']
    }),
    (0, typeorm_1.JoinColumn)({ name: 'collection_id' }),
    __metadata("design:type", collection_entity_1.Collection)
], Nft.prototype, "collection", void 0);
Nft = __decorate([
    (0, typeorm_1.Entity)('nfts')
], Nft);
exports.Nft = Nft;
//# sourceMappingURL=nft.entity.js.map