"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const collection_module_1 = require("../collection/collection.module");
const nft_module_1 = require("../nft/nft.module");
const offer_entity_1 = require("../offer/entities/offer.entity");
const collection_entity_1 = require("../collection/entities/collection.entity");
const list_entity_1 = require("./entities/list.entity");
const list_controller_1 = require("./list.controller");
const list_service_1 = require("./list.service");
let ListModule = class ListModule {
};
ListModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([list_entity_1.List, offer_entity_1.Offer, collection_entity_1.Collection]), collection_module_1.CollectionModule, nft_module_1.NftModule],
        controllers: [list_controller_1.ListController],
        providers: [list_service_1.ListService],
        exports: [list_service_1.ListService]
    })
], ListModule);
exports.ListModule = ListModule;
//# sourceMappingURL=list.module.js.map