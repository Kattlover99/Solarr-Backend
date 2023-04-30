import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { OfferDto } from './dto/offer.dto';
import { Offer } from './entities/offer.entity';
import { UpdateOfferDto } from './dto/updateOffer.dto';
import { Nft } from '../nft/entities/nft.entity';
import { NotificationService } from '../notification/notification.service';
export declare class OfferService {
    private offerRepository;
    private nftRepository;
    private notificationService;
    constructor(offerRepository: Repository<Offer>, nftRepository: Repository<Nft>, notificationService: NotificationService);
    createOffer(offerDto: OfferDto): Promise<Offer>;
    getOffers(options: IPaginationOptions): Promise<import("nestjs-typeorm-paginate").Pagination<Offer, import("nestjs-typeorm-paginate").IPaginationMeta>>;
    getOffer(lenderId: string, collectionAddress: string, tokenId: string, state: number): Promise<Offer>;
    getOffersNft(collectionAddress: string, tokenId: string, options: IPaginationOptions): Promise<import("nestjs-typeorm-paginate").Pagination<Offer, import("nestjs-typeorm-paginate").IPaginationMeta>>;
    getOffersReceived(borrowerId: string, options: IPaginationOptions): Promise<import("nestjs-typeorm-paginate").Pagination<Offer, import("nestjs-typeorm-paginate").IPaginationMeta>>;
    getOffersMade(lenderId: string, options: IPaginationOptions): Promise<import("nestjs-typeorm-paginate").Pagination<Offer, import("nestjs-typeorm-paginate").IPaginationMeta>>;
    updateOffer(id: string, updateOfferDto: UpdateOfferDto): Promise<Offer>;
    deleteOffer(id: string): Promise<{
        id: number;
    }>;
}
