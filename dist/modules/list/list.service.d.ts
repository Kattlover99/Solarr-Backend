import { Repository } from 'typeorm';
import { CreateListDto } from './dto/createList.dto';
import { List } from './entities/list.entity';
import { UpdateListDto } from './dto/updateList.dto';
import { ListByAccountDto } from './dto/listByAccountDto';
import { Collection } from '../collection/entities/collection.entity';
import { Offer } from '../offer/entities/offer.entity';
import { GetListDto } from './dto/getList.dto';
import { NftService } from '../nft/nft.service';
export declare class ListService {
    private listRepository;
    private offerRepository;
    private collectionRepository;
    private nftService;
    constructor(listRepository: Repository<List>, offerRepository: Repository<Offer>, collectionRepository: Repository<Collection>, nftService: NftService);
    createList(createListDto: CreateListDto): Promise<List>;
    getLists({ page, limit, orderByDate, orderByAmount, orderByCollection, collection, minAmount, maxAmount }: {
        page: any;
        limit: any;
        orderByDate: any;
        orderByAmount: any;
        orderByCollection: any;
        collection: any;
        minAmount: any;
        maxAmount: any;
    }, getListDto: GetListDto): Promise<import("nestjs-typeorm-paginate").Pagination<List, import("nestjs-typeorm-paginate").IPaginationMeta>>;
    getListByAccount(listByAccountDto: ListByAccountDto): Promise<any[]>;
    updateList(id: string, updateListDto: UpdateListDto): Promise<List>;
    deleteList(id: string): Promise<{
        id: number;
    }>;
}
