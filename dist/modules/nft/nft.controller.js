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
exports.NftController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../auth/guard/auth.guard");
const nft_service_1 = require("./nft.service");
const createNft_dto_1 = require("./dto/createNft.dto");
const detailNftQuery_dto_1 = require("./dto/detailNftQuery.dto");
const getNftsQuery_dto_1 = require("./dto/getNftsQuery.dto");
let NftController = class NftController {
    constructor(nftService) {
        this.nftService = nftService;
    }
    async createNft(request, CreateNftDto) {
        return this.nftService.createNft(CreateNftDto);
    }
    async getNfts(request, min, max, currency = 0, collectionId, page = 1, limit = 12) {
        return this.nftService.getNfts(request.user, { min, max, currency }, collectionId, {
            page,
            limit
        });
    }
    async getNft(collectionAddress, tokenId) {
        return this.nftService.getNft(collectionAddress, tokenId);
    }
};
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthenticationGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, createNft_dto_1.CreateNftDto]),
    __metadata("design:returntype", Promise)
], NftController.prototype, "createNft", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthenticationGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiQuery)({ type: getNftsQuery_dto_1.GetNftsQueryDto }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('min')),
    __param(2, (0, common_1.Query)('max')),
    __param(3, (0, common_1.Query)('currency')),
    __param(4, (0, common_1.Query)('collectionId')),
    __param(5, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(6, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(12), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], NftController.prototype, "getNfts", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthenticationGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiQuery)({ type: detailNftQuery_dto_1.DetailNftQueryDto }),
    (0, common_1.Get)('/detail'),
    __param(0, (0, common_1.Query)('collectionAddress')),
    __param(1, (0, common_1.Query)('tokenId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], NftController.prototype, "getNft", null);
NftController = __decorate([
    (0, swagger_1.ApiTags)('NFT'),
    (0, common_1.Controller)('nft'),
    __metadata("design:paramtypes", [nft_service_1.NftService])
], NftController);
exports.NftController = NftController;
//# sourceMappingURL=nft.controller.js.map