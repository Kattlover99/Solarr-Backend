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
exports.NftService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
const typeorm_2 = require("typeorm");
const collection_service_1 = require("../collection/collection.service");
const list_entity_1 = require("../list/entities/list.entity");
const offer_entity_1 = require("../offer/entities/offer.entity");
const nft_entity_1 = require("./entities/nft.entity");
const loan_entity_1 = require("../loan/entities/loan.entity");
let NftService = class NftService {
    constructor(nftRepository, listRepository, offerRepository, collectionService) {
        this.nftRepository = nftRepository;
        this.listRepository = listRepository;
        this.offerRepository = offerRepository;
        this.collectionService = collectionService;
    }
    async createNft(createNftDto) {
        const nft = new nft_entity_1.Nft();
        const { name, ownerId, tokenId, state, collectionFloor, bankValuation, collectionAddress, metadata } = createNftDto;
        const collection = await this.collectionService.getCollectionbyAddress(name, collectionAddress);
        const oldNft = await this.nftRepository.findOne({
            where: { tokenId, collectionId: collection.id }
        });
        if (createNftDto && !oldNft) {
            nft.name = name;
            nft.ownerId = ownerId;
            nft.tokenId = tokenId;
            nft.state = state;
            nft.collectionFloor = collectionFloor;
            nft.bankValuation = bankValuation;
            nft.metadata = metadata;
            nft.collectionId = collection.id;
            await this.nftRepository.save(nft);
        }
        return oldNft ? oldNft : nft;
    }
    async getNfts(user, loanFilter, collectionId, options) {
        const { id } = user;
        const { min, max, currency } = loanFilter;
        const collectionIdArr = collectionId && collectionId.split(',');
        const qb = this.nftRepository
            .createQueryBuilder('nft')
            .select()
            .leftJoinAndSelect('nft.collection', 'collection')
            .leftJoinAndSelect((qb) => qb
            .select('id', 'list_id')
            .addSelect('borrower_id', 'list_borrower_id')
            .addSelect('token_id', 'list_token_id')
            .addSelect('collection_address', 'list_collection_address')
            .addSelect('loan_amount', 'list_loan_amount')
            .addSelect('loan_type', 'list_loan_type')
            .from(list_entity_1.List, 'list'), 'list', `nft.owner_id = list.list_borrower_id
        AND nft.token_id = list.list_token_id
        AND collection.address = list.list_collection_address`)
            .leftJoinAndSelect((qb) => qb
            .select('id', 'offer_id')
            .addSelect('lender_id', 'offer_lender_id')
            .addSelect('token_id', 'offer_token_id')
            .addSelect('collection_address', 'offer_collection_address')
            .addSelect('state', 'offer_state')
            .from(offer_entity_1.Offer, 'offer'), 'offer', `offer.offer_lender_id = :user_id 
        AND nft.token_id = offer.offer_token_id 
        AND collection.address = offer.offer_collection_address
        AND offer_state = 0`, { user_id: id })
            .leftJoinAndSelect((qb) => qb
            .select('id', 'loan_id')
            .addSelect('borrower_id', 'loan_borrower_id')
            .addSelect('token_id', 'loan_token_id')
            .addSelect('collection_address', 'loan_collection_address')
            .addSelect('state', 'loan_state')
            .from(loan_entity_1.Loan, 'loan'), 'loan', `loan.loan_borrower_id = nft.owner_id
        AND nft.token_id = loan.loan_token_id 
        AND collection.address = loan.loan_collection_address`)
            .where('(loan_id IS NULL OR loan_state != 0) AND list_id IS NOT NULL')
            .orderBy('nft.created_at', 'DESC');
        if (collectionIdArr && collectionIdArr.length > 0) {
            qb.andWhere('collection.id IN(:...collection_id)', { collection_id: collectionIdArr });
        }
        if (min && max && currency !== undefined) {
            qb.andWhere('list_loan_amount BETWEEN :min AND :max', { min, max }).andWhere('list_loan_type = :currency', { currency });
        }
        const [results, entities] = await (0, nestjs_typeorm_paginate_1.paginateRawAndEntities)(qb, options);
        if (results && results.items) {
            for (const nft of results.items) {
                const entity = entities.find((e) => e['nft_id'] === nft.id);
                const list = await this.listRepository.findOne({ id: entity['list_id'] });
                const offer = await this.offerRepository.findOne({ id: entity['offer_id'] });
                nft.list = list ? list : null;
                nft.offer = offer ? offer : null;
            }
        }
        return results;
    }
    async getNft(collectionAddress, tokenId) {
        const nft = await this.nftRepository.findOne({
            relations: ['owner', 'collection'],
            where: {
                collection: { address: collectionAddress },
                tokenId
            }
        });
        return nft ? nft : null;
    }
    async deleteNft(id) {
        await this.nftRepository.update(id, { deletedAt: new Date() });
        const updatedNft = await this.nftRepository.findOne(id, { withDeleted: true });
        if (updatedNft) {
            return { id: updatedNft.id };
        }
        throw new common_1.HttpException('NFT not found', common_1.HttpStatus.NOT_FOUND);
    }
};
NftService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(nft_entity_1.Nft)),
    __param(1, (0, typeorm_1.InjectRepository)(list_entity_1.List)),
    __param(2, (0, typeorm_1.InjectRepository)(offer_entity_1.Offer)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        collection_service_1.CollectionService])
], NftService);
exports.NftService = NftService;
//# sourceMappingURL=nft.service.js.map