import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { CreateOfferHistoryDto } from './dto/createOfferHistory.dto';
import { UpdateOfferHistoryDto } from './dto/updateOfferHistory.dto';
import { OfferHistory } from './entities/offerHistory.entity';
export declare class OfferHistoryService {
    private offerHistoryRepository;
    constructor(offerHistoryRepository: Repository<OfferHistory>);
    createOfferHistory(offerHistoryDto: CreateOfferHistoryDto): Promise<OfferHistory>;
    getOfferHistorys(options: IPaginationOptions): Promise<import("nestjs-typeorm-paginate").Pagination<OfferHistory, import("nestjs-typeorm-paginate").IPaginationMeta>>;
    updateOfferHistory(id: string, updateOfferHistoryDto: UpdateOfferHistoryDto): Promise<OfferHistory>;
    deleteOfferHistory(id: string): Promise<{
        id: number;
    }>;
}
