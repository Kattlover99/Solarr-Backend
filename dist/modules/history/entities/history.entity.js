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
exports.History = void 0;
const typeorm_1 = require("typeorm");
const core_entity_1 = require("../../../core/typeorm/core.entity");
const user_entity_1 = require("../../user/entities/user.entity");
let History = class History extends core_entity_1.CoreEntity {
};
__decorate([
    (0, typeorm_1.Column)({ name: 'loan_amount', default: null }),
    __metadata("design:type", Number)
], History.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'lender_action', default: null }),
    __metadata("design:type", Number)
], History.prototype, "lenderAtion", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'borrower_action', default: null }),
    __metadata("design:type", Number)
], History.prototype, "borrowerAtion", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id' }),
    __metadata("design:type", Number)
], History.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'collection_address' }),
    __metadata("design:type", String)
], History.prototype, "collectionAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'token_id' }),
    __metadata("design:type", String)
], History.prototype, "tokenId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.id, {
        cascade: ['update', 'remove']
    }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], History.prototype, "user", void 0);
History = __decorate([
    (0, typeorm_1.Entity)('history')
], History);
exports.History = History;
//# sourceMappingURL=history.entity.js.map