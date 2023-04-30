"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhitelistModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const whitelist_entity_1 = require("./entities/whitelist.entity");
const whitelist_controller_1 = require("./whitelist.controller");
const whitelist_service_1 = require("./whitelist.service");
let WhitelistModule = class WhitelistModule {
};
WhitelistModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([whitelist_entity_1.Whitelist])],
        controllers: [whitelist_controller_1.WhitelistController],
        providers: [whitelist_service_1.WhitelistService]
    })
], WhitelistModule);
exports.WhitelistModule = WhitelistModule;
//# sourceMappingURL=whitelist.module.js.map