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
exports.CollectionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
const typeorm_2 = require("typeorm");
const collection_entity_1 = require("./entities/collection.entity");
let CollectionService = class CollectionService {
    constructor(collectionRepository) {
        this.collectionRepository = collectionRepository;
    }
    async createCollection(createCollectionDto) {
        const nft = new collection_entity_1.Collection();
        if (createCollectionDto) {
            nft.name = createCollectionDto.name;
            nft.address = createCollectionDto.address;
        }
        await this.collectionRepository.save(nft);
        return nft;
    }
    async getCollections(options) {
        const result = await (0, nestjs_typeorm_paginate_1.paginate)(this.collectionRepository, options, { where: { whitelisted: true } });
        return result ? result : null;
    }
    async getCollectionbyAddress(name, address) {
        let collection = await this.collectionRepository.findOne({ address });
        if (!collection) {
            collection = await this.createCollection({ name, address });
        }
        return collection;
    }
};
CollectionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(collection_entity_1.Collection)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CollectionService);
exports.CollectionService = CollectionService;
//# sourceMappingURL=collection.service.js.map