import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { CreateLoanHistoryDto } from './dto/createLoanHistory.dto';
import { LoanHistory } from './entities/loanHistory.entity';
import { UpdateLoanHistoryDto } from './dto/updateLoanHistory';
export declare class LoanHistoryService {
    private loanHistoryRepository;
    constructor(loanHistoryRepository: Repository<LoanHistory>);
    createLoanHistory(loanHistoryDto: CreateLoanHistoryDto): Promise<LoanHistory>;
    getLoanHistoryByNft(collectionAddress: string, tokenId: string, options: IPaginationOptions): Promise<import("nestjs-typeorm-paginate").Pagination<LoanHistory, import("nestjs-typeorm-paginate").IPaginationMeta>>;
    getLoanHistorys(options: IPaginationOptions): Promise<import("nestjs-typeorm-paginate").Pagination<LoanHistory, import("nestjs-typeorm-paginate").IPaginationMeta>>;
    updateLoanHistory(id: string, updateLoanHistoryDto: UpdateLoanHistoryDto): Promise<LoanHistory>;
    deleteLoanHistory(id: string): Promise<{
        id: number;
    }>;
}
