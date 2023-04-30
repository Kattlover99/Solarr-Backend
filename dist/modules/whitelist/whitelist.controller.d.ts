import { WhitelistService } from './whitelist.service';
import { CreateWhitelistDto } from './dto/createWhitelist.dto';
export declare class WhitelistController {
    private listService;
    constructor(listService: WhitelistService);
    create(request: any, CreateWhitelistDto: CreateWhitelistDto): Promise<import("./entities/whitelist.entity").Whitelist>;
    getTransactionByAction(page?: number, limit?: number): Promise<import("nestjs-typeorm-paginate").Pagination<import("./entities/whitelist.entity").Whitelist, import("nestjs-typeorm-paginate").IPaginationMeta>>;
}
