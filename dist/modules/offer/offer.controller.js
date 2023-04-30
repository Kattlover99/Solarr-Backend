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
exports.OfferController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../auth/guard/auth.guard");
const offer_service_1 = require("./offer.service");
const offer_dto_1 = require("./dto/offer.dto");
const updateOffer_dto_1 = require("./dto/updateOffer.dto");
const offersNftQuery_dto_1 = require("./dto/offersNftQuery.dto");
const offerReceivedQuery_dto_1 = require("./dto/offerReceivedQuery.dto");
const offerQuery_dto_1 = require("./dto/offerQuery.dto");
const offerMadeQuery_dto_1 = require("./dto/offerMadeQuery.dto");
let OfferController = class OfferController {
    constructor(offerService) {
        this.offerService = offerService;
    }
    async createOffer(request, OfferDto) {
        return this.offerService.createOffer(OfferDto);
    }
    async getOffers(page = 1, limit = 20) {
        return this.offerService.getOffers({
            page,
            limit
        });
    }
    async getOffer(lenderId, collectionAddress, tokenId, state = 0) {
        return this.offerService.getOffer(lenderId, collectionAddress, tokenId, state);
    }
    async getOffersNft(collectionAddress, tokenId, page = 1, limit = 6) {
        return this.offerService.getOffersNft(collectionAddress, tokenId, {
            page,
            limit
        });
    }
    async getOffersReceived(borrowerId, page = 1, limit = 8) {
        return this.offerService.getOffersReceived(borrowerId, {
            page,
            limit
        });
    }
    async getOffersMade(lenderId, page = 1, limit = 8) {
        return this.offerService.getOffersMade(lenderId, {
            page,
            limit
        });
    }
    async updateOffer(id, updateOfferDto) {
        return this.offerService.updateOffer(id, updateOfferDto);
    }
    async deleteOffer(id) {
        return this.offerService.deleteOffer(id);
    }
};
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthenticationGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, offer_dto_1.OfferDto]),
    __metadata("design:returntype", Promise)
], OfferController.prototype, "createOffer", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthenticationGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(20), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OfferController.prototype, "getOffers", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthenticationGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiQuery)({ type: offerQuery_dto_1.OfferQueryDto }),
    (0, common_1.Get)('/offer'),
    __param(0, (0, common_1.Query)('lenderId')),
    __param(1, (0, common_1.Query)('collectionAddress')),
    __param(2, (0, common_1.Query)('tokenId')),
    __param(3, (0, common_1.Query)('state', new common_1.DefaultValuePipe(0), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], OfferController.prototype, "getOffer", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthenticationGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiQuery)({ type: offersNftQuery_dto_1.OffersNftQueryDto }),
    (0, common_1.Get)('/nft'),
    __param(0, (0, common_1.Query)('collectionAddress')),
    __param(1, (0, common_1.Query)('tokenId')),
    __param(2, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(3, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(6), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], OfferController.prototype, "getOffersNft", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthenticationGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiQuery)({ type: offerReceivedQuery_dto_1.OffersReceivedQueryDto }),
    (0, common_1.Get)('/received'),
    __param(0, (0, common_1.Query)('borrowerId')),
    __param(1, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(8), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], OfferController.prototype, "getOffersReceived", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthenticationGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiQuery)({ type: offerMadeQuery_dto_1.OffersMadeQueryDto }),
    (0, common_1.Get)('/made'),
    __param(0, (0, common_1.Query)('lenderId')),
    __param(1, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(8), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], OfferController.prototype, "getOffersMade", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthenticationGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Patch)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, updateOffer_dto_1.UpdateOfferDto]),
    __metadata("design:returntype", Promise)
], OfferController.prototype, "updateOffer", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthenticationGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OfferController.prototype, "deleteOffer", null);
OfferController = __decorate([
    (0, swagger_1.ApiTags)('Offer'),
    (0, common_1.Controller)('offer'),
    __metadata("design:paramtypes", [offer_service_1.OfferService])
], OfferController);
exports.OfferController = OfferController;
//# sourceMappingURL=offer.controller.js.map