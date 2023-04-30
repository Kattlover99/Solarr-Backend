import { OfferService } from './offer.service';
import { OfferDto } from './dto/offer.dto';
import { UpdateOfferDto } from './dto/updateOffer.dto';
export declare class OfferController {
    private offerService;
    constructor(offerService: OfferService);
    createOffer(request: any, OfferDto: OfferDto): Promise<import("./entities/offer.entity").Offer>;
    getOffers(page?: number, limit?: number): Promise<import("nestjs-typeorm-paginate").Pagination<import("./entities/offer.entity").Offer, import("nestjs-typeorm-paginate").IPaginationMeta>>;
    getOffer(lenderId: any, collectionAddress: any, tokenId: any, state?: number): Promise<import("./entities/offer.entity").Offer>;
    getOffersNft(collectionAddress: any, tokenId: any, page?: number, limit?: number): Promise<import("nestjs-typeorm-paginate").Pagination<import("./entities/offer.entity").Offer, import("nestjs-typeorm-paginate").IPaginationMeta>>;
    getOffersReceived(borrowerId: any, page?: number, limit?: number): Promise<import("nestjs-typeorm-paginate").Pagination<import("./entities/offer.entity").Offer, import("nestjs-typeorm-paginate").IPaginationMeta>>;
    getOffersMade(lenderId: any, page?: number, limit?: number): Promise<import("nestjs-typeorm-paginate").Pagination<import("./entities/offer.entity").Offer, import("nestjs-typeorm-paginate").IPaginationMeta>>;
    updateOffer(id: string, updateOfferDto: UpdateOfferDto): Promise<import("./entities/offer.entity").Offer>;
    deleteOffer(id: string): Promise<{
        id: number;
    }>;
}
