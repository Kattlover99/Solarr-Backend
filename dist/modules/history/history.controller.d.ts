import { HistoryService } from './history.service';
import { CreateHistoryDto } from './dto/createHistory.dto';
export declare class HistoryController {
    private historyService;
    constructor(historyService: HistoryService);
    mint(request: any, createHistoryDto: CreateHistoryDto): Promise<import("./entities/history.entity").History>;
    getTransactionByAction(page?: number, limit?: number): Promise<import("nestjs-typeorm-paginate").Pagination<import("./entities/history.entity").History, import("nestjs-typeorm-paginate").IPaginationMeta>>;
}
