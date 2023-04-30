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
exports.OfferHistoryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../auth/guard/auth.guard");
const offerHistory_service_1 = require("./offerHistory.service");
const createOfferHistory_dto_1 = require("./dto/createOfferHistory.dto");
const updateOfferHistory_dto_1 = require("./dto/updateOfferHistory.dto");
let OfferHistoryController = class OfferHistoryController {
    constructor(offerHistoryService) {
        this.offerHistoryService = offerHistoryService;
    }
    async mint(request, createOfferHistoryDto) {
        return this.offerHistoryService.createOfferHistory(createOfferHistoryDto);
    }
    async getTransactionByAction(page = 1, limit = 20) {
        return this.offerHistoryService.getOfferHistorys({
            page,
            limit
        });
    }
    async updateOfferHistory(id, updateOfferHistoryDto) {
        return this.offerHistoryService.updateOfferHistory(id, updateOfferHistoryDto);
    }
    async deleteOfferHistory(id) {
        return this.offerHistoryService.deleteOfferHistory(id);
    }
};
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthenticationGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, createOfferHistory_dto_1.CreateOfferHistoryDto]),
    __metadata("design:returntype", Promise)
], OfferHistoryController.prototype, "mint", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthenticationGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(20), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OfferHistoryController.prototype, "getTransactionByAction", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthenticationGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Patch)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, updateOfferHistory_dto_1.UpdateOfferHistoryDto]),
    __metadata("design:returntype", Promise)
], OfferHistoryController.prototype, "updateOfferHistory", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthenticationGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OfferHistoryController.prototype, "deleteOfferHistory", null);
OfferHistoryController = __decorate([
    (0, swagger_1.ApiTags)('OfferHistory'),
    (0, common_1.Controller)('offer-history'),
    __metadata("design:paramtypes", [offerHistory_service_1.OfferHistoryService])
], OfferHistoryController);
exports.OfferHistoryController = OfferHistoryController;
//# sourceMappingURL=offerHistory.controller.js.map