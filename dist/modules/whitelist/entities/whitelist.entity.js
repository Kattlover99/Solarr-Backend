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
exports.Whitelist = void 0;
const typeorm_1 = require("typeorm");
const core_entity_1 = require("../../../core/typeorm/core.entity");
let Whitelist = class Whitelist extends core_entity_1.CoreEntity {
};
__decorate([
    (0, typeorm_1.Column)({ name: 'collection_address', default: null }),
    __metadata("design:type", String)
], Whitelist.prototype, "collectionAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'token_id', default: null }),
    __metadata("design:type", String)
], Whitelist.prototype, "tokenId", void 0);
Whitelist = __decorate([
    (0, typeorm_1.Entity)('whitelists')
], Whitelist);
exports.Whitelist = Whitelist;
//# sourceMappingURL=whitelist.entity.js.map