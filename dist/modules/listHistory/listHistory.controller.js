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
exports.ListHistoryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../auth/guard/auth.guard");
const listHistory_service_1 = require("./listHistory.service");
const createListHistory_dto_1 = require("./dto/createListHistory.dto");
const updateListHistory_dto_1 = require("./dto/updateListHistory.dto");
let ListHistoryController = class ListHistoryController {
    constructor(listHistoryService) {
        this.listHistoryService = listHistoryService;
    }
    async mint(request, createListHistoryDto) {
        return this.listHistoryService.createListHistory(createListHistoryDto);
    }
    async getTransactionByAction(page = 1, limit = 20) {
        return this.listHistoryService.getListHistorys({
            page,
            limit
        });
    }
    async updateListHistory(id, updateListHistoryDto) {
        return this.listHistoryService.updateListHistory(id, updateListHistoryDto);
    }
    async deleteListHistory(id) {
        return this.listHistoryService.deleteListHistory(id);
    }
};
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthenticationGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, createListHistory_dto_1.CreateListHistoryDto]),
    __metadata("design:returntype", Promise)
], ListHistoryController.prototype, "mint", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthenticationGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(20), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ListHistoryController.prototype, "getTransactionByAction", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthenticationGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Patch)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, updateListHistory_dto_1.UpdateListHistoryDto]),
    __metadata("design:returntype", Promise)
], ListHistoryController.prototype, "updateListHistory", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthenticationGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ListHistoryController.prototype, "deleteListHistory", null);
ListHistoryController = __decorate([
    (0, swagger_1.ApiTags)('ListHistory'),
    (0, common_1.Controller)('list-history'),
    __metadata("design:paramtypes", [listHistory_service_1.ListHistoryService])
], ListHistoryController);
exports.ListHistoryController = ListHistoryController;
//# sourceMappingURL=listHistory.controller.js.map