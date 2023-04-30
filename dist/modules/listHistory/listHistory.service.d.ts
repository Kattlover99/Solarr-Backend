import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { CreateListHistoryDto } from './dto/createListHistory.dto';
import { ListHistory } from './entities/listHistory.entity';
import { UpdateListHistoryDto } from './dto/updateListHistory.dto';
export declare class ListHistoryService {
    private listHistoryRepository;
    constructor(listHistoryRepository: Repository<ListHistory>);
    createListHistory(listHistoryDto: CreateListHistoryDto): Promise<ListHistory>;
    getListHistorys(options: IPaginationOptions): Promise<import("nestjs-typeorm-paginate").Pagination<ListHistory, import("nestjs-typeorm-paginate").IPaginationMeta>>;
    updateListHistory(id: string, updateListHistoryDto: UpdateListHistoryDto): Promise<ListHistory>;
    deleteListHistory(id: string): Promise<{
        id: number;
    }>;
}
