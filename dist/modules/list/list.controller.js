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
exports.ListController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../auth/guard/auth.guard");
const list_service_1 = require("./list.service");
const createList_dto_1 = require("./dto/createList.dto");
const updateList_dto_1 = require("./dto/updateList.dto");
const listByAccountDto_1 = require("./dto/listByAccountDto");
const getList_dto_1 = require("./dto/getList.dto");
let ListController = class ListController {
    constructor(listService) {
        this.listService = listService;
    }
    async createList(createListDto) {
        return this.listService.createList(createListDto);
    }
    async getLists(page = 1, limit = 20, orderByDate = 0, orderByAmount = 0, orderByCollection = 0, collection = '', minAmount = 0, maxAmount = 999999, getListDto) {
        return this.listService.getLists({
            page,
            limit,
            orderByDate,
            orderByAmount,
            orderByCollection,
            collection,
            minAmount,
            maxAmount
        }, getListDto);
    }
    async getByAccount(listByAccountDto) {
        return this.listService.getListByAccount(listByAccountDto);
    }
    async updateList(id, updateListDto) {
        return this.listService.updateList(id, updateListDto);
    }
    async deleteList(id) {
        return this.listService.deleteList(id);
    }
};
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthenticationGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createList_dto_1.CreateListDto]),
    __metadata("design:returntype", Promise)
], ListController.prototype, "createList", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthenticationGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(20), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('orderByDate', new common_1.DefaultValuePipe(0), common_1.ParseIntPipe)),
    __param(3, (0, common_1.Query)('orderByAmount', new common_1.DefaultValuePipe(0), common_1.ParseIntPipe)),
    __param(4, (0, common_1.Query)('orderByCollection', new common_1.DefaultValuePipe(0), common_1.ParseIntPipe)),
    __param(5, (0, common_1.Query)('collection', new common_1.DefaultValuePipe(''), common_1.ParseIntPipe)),
    __param(6, (0, common_1.Query)('minAmount', new common_1.DefaultValuePipe(0), common_1.ParseIntPipe)),
    __param(7, (0, common_1.Query)('maxAmount', new common_1.DefaultValuePipe(999999), common_1.ParseIntPipe)),
    __param(8, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, Object, Object, getList_dto_1.GetListDto]),
    __metadata("design:returntype", Promise)
], ListController.prototype, "getLists", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthenticationGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)('/account'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [listByAccountDto_1.ListByAccountDto]),
    __metadata("design:returntype", Promise)
], ListController.prototype, "getByAccount", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthenticationGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Patch)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, updateList_dto_1.UpdateListDto]),
    __metadata("design:returntype", Promise)
], ListController.prototype, "updateList", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthenticationGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ListController.prototype, "deleteList", null);
ListController = __decorate([
    (0, swagger_1.ApiTags)('List'),
    (0, common_1.Controller)('list'),
    __metadata("design:paramtypes", [list_service_1.ListService])
], ListController);
exports.ListController = ListController;
//# sourceMappingURL=list.controller.js.map