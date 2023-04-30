import { ListHistoryService } from './listHistory.service';
import { CreateListHistoryDto } from './dto/createListHistory.dto';
import { UpdateListHistoryDto } from './dto/updateListHistory.dto';
export declare class ListHistoryController {
    private listHistoryService;
    constructor(listHistoryService: ListHistoryService);
    mint(request: any, createListHistoryDto: CreateListHistoryDto): Promise<import("./entities/listHistory.entity").ListHistory>;
    getTransactionByAction(page?: number, limit?: number): Promise<import("nestjs-typeorm-paginate").Pagination<import("./entities/listHistory.entity").ListHistory, import("nestjs-typeorm-paginate").IPaginationMeta>>;
    updateListHistory(id: string, updateListHistoryDto: UpdateListHistoryDto): Promise<import("./entities/listHistory.entity").ListHistory>;
    deleteListHistory(id: string): Promise<{
        id: number;
    }>;
}
