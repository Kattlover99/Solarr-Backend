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
exports.ListService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
const typeorm_2 = require("typeorm");
const list_entity_1 = require("./entities/list.entity");
const collection_entity_1 = require("../collection/entities/collection.entity");
const offer_entity_1 = require("../offer/entities/offer.entity");
const nft_service_1 = require("../nft/nft.service");
let ListService = class ListService {
    constructor(listRepository, offerRepository, collectionRepository, nftService) {
        this.listRepository = listRepository;
        this.offerRepository = offerRepository;
        this.collectionRepository = collectionRepository;
        this.nftService = nftService;
    }
    async createList(createListDto) {
        const { name, tokenId, state, metadata, collectionFloor, bankValuation, ownerId, collectionAddress, loanAmount, loanType, period, apr, borrowerId } = createListDto;
        await this.nftService.createNft({
            name,
            tokenId,
            state,
            metadata,
            collectionFloor,
            bankValuation,
            ownerId,
            collectionAddress
        });
        const list = new list_entity_1.List();
        if (createListDto) {
            list.loanAmount = loanAmount;
            list.loanType = loanType;
            list.period = period;
            list.apr = apr;
            list.borrowerId = borrowerId;
            list.collectionAddress = collectionAddress;
            list.tokenId = tokenId;
            list.metadata = metadata;
        }
        await this.listRepository.save(list);
        return list;
    }
    async getLists({ page, limit, orderByDate, orderByAmount, orderByCollection, collection, minAmount, maxAmount }, getListDto) {
        let lists = await this.listRepository
            .createQueryBuilder('list')
            .select()
            .where('deleted_at IS NULL')
            .andWhere('list.collection_address like :collection_address', {
            collection_address: `%${collection}%`
        })
            .andWhere('amount >= :amount', {
            amount: minAmount
        })
            .andWhere('amount <= :amount', {
            amount: maxAmount
        });
        if (orderByDate === 1 || orderByDate === 2) {
            lists = lists.addOrderBy('updatedAt', orderByDate === 1 ? 'ASC' : 'DESC');
        }
        if (orderByAmount === 1 || orderByAmount === 2) {
            lists = lists.addOrderBy('amount', orderByAmount === 1 ? 'ASC' : 'DESC');
        }
        if (orderByCollection === 1 || orderByCollection === 2) {
            lists = lists.addOrderBy('collectionAddress', orderByCollection === 1 ? 'ASC' : 'DESC');
        }
        const results = await (0, nestjs_typeorm_paginate_1.paginate)(lists, { page, limit });
        if (results && results.items) {
            for (const list of results.items) {
                const offer = await this.offerRepository.findOne({
                    where: { lenderId: getListDto.lenderId }
                });
                list.isOffered = !!offer;
            }
            return results;
        }
        return results ? results : null;
    }
    async getListByAccount(listByAccountDto) {
        const listData = [];
        await Promise.all(listByAccountDto.nfts.map(async (el) => {
            const list = await this.listRepository.findOne({
                where: {
                    borrowerId: listByAccountDto.borrowerId,
                    collectionAddress: el.collection,
                    tokenId: el.tokenId
                }
            });
            const collection = await this.collectionRepository.findOne({
                where: {
                    address: el.collection,
                    whitelisted: true
                }
            });
            listData.push({
                list: list ? list : null,
                collection: el.collection,
                tokenId: el.tokenId,
                isWhitelisted: !!collection
            });
        }));
        if (listByAccountDto.checkOwnership) {
            const allListsOfAccount = await this.listRepository.find({
                where: { borrowerId: listByAccountDto.borrowerId }
            });
            await Promise.all(allListsOfAccount.map(async (listBE) => {
                const found = listData.find((listItem) => listItem.list &&
                    listItem.list.tokenId === listBE.tokenId &&
                    listItem.list.collectionAddress === listBE.collectionAddress);
                if (!found) {
                    await this.listRepository.update(listBE.id, { deletedAt: new Date() });
                    const nft = await this.nftService.getNft(listBE.collectionAddress, listBE.tokenId);
                    if (nft) {
                        await this.nftService.deleteNft(nft.id);
                    }
                }
            }));
        }
        return listData;
    }
    async updateList(id, updateListDto) {
        await this.listRepository.update(id, updateListDto);
        const updatedList = await this.listRepository.findOne(id);
        if (updatedList) {
            return updatedList;
        }
        throw new common_1.HttpException('List not found', common_1.HttpStatus.NOT_FOUND);
    }
    async deleteList(id) {
        await this.listRepository.update(id, { deletedAt: new Date() });
        const updatedList = await this.listRepository.findOne(id, { withDeleted: true });
        if (updatedList) {
            return { id: updatedList.id };
        }
        throw new common_1.HttpException('List not found', common_1.HttpStatus.NOT_FOUND);
    }
};
ListService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(list_entity_1.List)),
    __param(1, (0, typeorm_1.InjectRepository)(offer_entity_1.Offer)),
    __param(2, (0, typeorm_1.InjectRepository)(collection_entity_1.Collection)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        nft_service_1.NftService])
], ListService);
exports.ListService = ListService;
//# sourceMappingURL=list.service.js.map