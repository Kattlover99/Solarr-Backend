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
exports.ListHistoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
const typeorm_2 = require("typeorm");
const listHistory_entity_1 = require("./entities/listHistory.entity");
let ListHistoryService = class ListHistoryService {
    constructor(listHistoryRepository) {
        this.listHistoryRepository = listHistoryRepository;
    }
    async createListHistory(listHistoryDto) {
        const listHistory = new listHistory_entity_1.ListHistory();
        if (listHistoryDto) {
            listHistory.action = listHistoryDto.action;
            listHistory.listId = listHistoryDto.listId;
        }
        await this.listHistoryRepository.save(listHistory);
        return listHistory;
    }
    async getListHistorys(options) {
        const result = await (0, nestjs_typeorm_paginate_1.paginate)(this.listHistoryRepository, options);
        return result ? result : null;
    }
    async updateListHistory(id, updateListHistoryDto) {
        await this.listHistoryRepository.update(id, updateListHistoryDto);
        const updatedListHistory = await this.listHistoryRepository.findOne(id);
        if (updatedListHistory) {
            return updatedListHistory;
        }
        throw new common_1.HttpException('ListHistory not found', common_1.HttpStatus.NOT_FOUND);
    }
    async deleteListHistory(id) {
        await this.listHistoryRepository.update(id, { deletedAt: new Date() });
        const deletedListHistory = await this.listHistoryRepository.findOne(id, { withDeleted: true });
        if (deletedListHistory) {
            return { id: deletedListHistory.id };
        }
        throw new common_1.HttpException('ListHistory not found', common_1.HttpStatus.NOT_FOUND);
    }
};
ListHistoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(listHistory_entity_1.ListHistory)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ListHistoryService);
exports.ListHistoryService = ListHistoryService;
//# sourceMappingURL=listHistory.service.js.map