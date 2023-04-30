import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { CreateHistoryDto } from './dto/createHistory.dto';
import { History } from './entities/history.entity';
export declare class HistoryService {
    private historyRepository;
    constructor(historyRepository: Repository<History>);
    createHistory(historyDto: CreateHistoryDto): Promise<History>;
    getHistorys(options: IPaginationOptions): Promise<import("nestjs-typeorm-paginate").Pagination<History, import("nestjs-typeorm-paginate").IPaginationMeta>>;
}
