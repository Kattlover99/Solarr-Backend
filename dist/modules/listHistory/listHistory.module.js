"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListHistoryModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const listHistory_entity_1 = require("./entities/listHistory.entity");
const listHistory_controller_1 = require("./listHistory.controller");
const listHistory_service_1 = require("./listHistory.service");
let ListHistoryModule = class ListHistoryModule {
};
ListHistoryModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([listHistory_entity_1.ListHistory])],
        controllers: [listHistory_controller_1.ListHistoryController],
        providers: [listHistory_service_1.ListHistoryService]
    })
], ListHistoryModule);
exports.ListHistoryModule = ListHistoryModule;
//# sourceMappingURL=listHistory.module.js.map