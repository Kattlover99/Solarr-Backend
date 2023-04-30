import { OfferHistoryService } from './offerHistory.service';
import { CreateOfferHistoryDto } from './dto/createOfferHistory.dto';
import { UpdateOfferHistoryDto } from './dto/updateOfferHistory.dto';
export declare class OfferHistoryController {
    private offerHistoryService;
    constructor(offerHistoryService: OfferHistoryService);
    mint(request: any, createOfferHistoryDto: CreateOfferHistoryDto): Promise<import("./entities/offerHistory.entity").OfferHistory>;
    getTransactionByAction(page?: number, limit?: number): Promise<import("nestjs-typeorm-paginate").Pagination<import("./entities/offerHistory.entity").OfferHistory, import("nestjs-typeorm-paginate").IPaginationMeta>>;
    updateOfferHistory(id: string, updateOfferHistoryDto: UpdateOfferHistoryDto): Promise<import("./entities/offerHistory.entity").OfferHistory>;
    deleteOfferHistory(id: string): Promise<{
        id: number;
    }>;
}
