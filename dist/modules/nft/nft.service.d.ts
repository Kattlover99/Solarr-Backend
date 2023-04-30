import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { CollectionService } from 'src/modules/collection/collection.service';
import { List } from 'src/modules/list/entities/list.entity';
import { Offer } from 'src/modules/offer/entities/offer.entity';
import { CreateNftDto } from './dto/createNft.dto';
import { Nft } from './entities/nft.entity';
export declare class NftService {
    private nftRepository;
    private listRepository;
    private offerRepository;
    private collectionService;
    constructor(nftRepository: Repository<Nft>, listRepository: Repository<List>, offerRepository: Repository<Offer>, collectionService: CollectionService);
    createNft(createNftDto: CreateNftDto): Promise<Nft>;
    getNfts(user: {
        id: string;
    }, loanFilter: {
        min: string;
        max: string;
        currency: number;
    }, collectionId: string, options: IPaginationOptions): Promise<import("nestjs-typeorm-paginate").Pagination<Nft, import("nestjs-typeorm-paginate").IPaginationMeta>>;
    getNft(collectionAddress: string, tokenId: string): Promise<Nft>;
    deleteNft(id: string | number): Promise<{
        id: number;
    }>;
}
