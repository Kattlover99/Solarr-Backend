import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { CreateWhitelistDto } from './dto/createWhitelist.dto';
import { Whitelist } from './entities/whitelist.entity';
export declare class WhitelistService {
    private whitelistRepository;
    constructor(whitelistRepository: Repository<Whitelist>);
    createWhitelist(createWhitelistDto: CreateWhitelistDto): Promise<Whitelist>;
    getWhitelists(options: IPaginationOptions): Promise<import("nestjs-typeorm-paginate").Pagination<Whitelist, import("nestjs-typeorm-paginate").IPaginationMeta>>;
}
