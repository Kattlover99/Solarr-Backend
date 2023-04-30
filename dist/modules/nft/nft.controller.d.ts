import { NftService } from './nft.service';
import { CreateNftDto } from './dto/createNft.dto';
export declare class NftController {
    private nftService;
    constructor(nftService: NftService);
    createNft(request: any, CreateNftDto: CreateNftDto): Promise<import("./entities/nft.entity").Nft>;
    getNfts(request: any, min: any, max: any, currency: number, collectionId: any, page?: number, limit?: number): Promise<import("nestjs-typeorm-paginate").Pagination<import("./entities/nft.entity").Nft, import("nestjs-typeorm-paginate").IPaginationMeta>>;
    getNft(collectionAddress: any, tokenId: any): Promise<import("./entities/nft.entity").Nft>;
}
