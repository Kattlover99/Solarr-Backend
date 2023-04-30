import { ListService } from './list.service';
import { CreateListDto } from './dto/createList.dto';
import { UpdateListDto } from './dto/updateList.dto';
import { ListByAccountDto } from './dto/listByAccountDto';
import { GetListDto } from './dto/getList.dto';
export declare class ListController {
    private listService;
    constructor(listService: ListService);
    createList(createListDto: CreateListDto): Promise<import("./entities/list.entity").List>;
    getLists(page: number, limit: number, orderByDate: number, orderByAmount: number, orderByCollection: number, collection: string, minAmount: number, maxAmount: number, getListDto: GetListDto): Promise<import("nestjs-typeorm-paginate").Pagination<import("./entities/list.entity").List, import("nestjs-typeorm-paginate").IPaginationMeta>>;
    getByAccount(listByAccountDto: ListByAccountDto): Promise<any[]>;
    updateList(id: string, updateListDto: UpdateListDto): Promise<import("./entities/list.entity").List>;
    deleteList(id: string): Promise<{
        id: number;
    }>;
}
