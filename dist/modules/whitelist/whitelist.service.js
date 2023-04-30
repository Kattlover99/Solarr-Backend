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
exports.WhitelistService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
const typeorm_2 = require("typeorm");
const whitelist_entity_1 = require("./entities/whitelist.entity");
let WhitelistService = class WhitelistService {
    constructor(whitelistRepository) {
        this.whitelistRepository = whitelistRepository;
    }
    async createWhitelist(createWhitelistDto) {
        const whitelist = new whitelist_entity_1.Whitelist();
        if (createWhitelistDto) {
            whitelist.collectionAddress = createWhitelistDto.collectionAddress;
            whitelist.tokenId = createWhitelistDto.tokenId;
        }
        await this.whitelistRepository.save(whitelist);
        return whitelist;
    }
    async getWhitelists(options) {
        const result = await (0, nestjs_typeorm_paginate_1.paginate)(this.whitelistRepository, options);
        return result ? result : null;
    }
};
WhitelistService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(whitelist_entity_1.Whitelist)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], WhitelistService);
exports.WhitelistService = WhitelistService;
//# sourceMappingURL=whitelist.service.js.map