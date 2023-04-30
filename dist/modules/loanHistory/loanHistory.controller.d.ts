import { LoanHistoryService } from './loanHistory.service';
import { CreateLoanHistoryDto } from './dto/createLoanHistory.dto';
import { UpdateLoanHistoryDto } from './dto/updateLoanHistory';
export declare class LoanHistoryController {
    private loanHistoryService;
    constructor(loanHistoryService: LoanHistoryService);
    mint(request: any, createLoanHistoryDto: CreateLoanHistoryDto): Promise<import("./entities/loanHistory.entity").LoanHistory>;
    getLoanHistoryByNft(collectionAddress: any, tokenId: any, page?: number, limit?: number): Promise<import("nestjs-typeorm-paginate").Pagination<import("./entities/loanHistory.entity").LoanHistory, import("nestjs-typeorm-paginate").IPaginationMeta>>;
    getTransactionByAction(page?: number, limit?: number): Promise<import("nestjs-typeorm-paginate").Pagination<import("./entities/loanHistory.entity").LoanHistory, import("nestjs-typeorm-paginate").IPaginationMeta>>;
    updateLoanHistory(id: string, updateLoanHistoryDto: UpdateLoanHistoryDto): Promise<import("./entities/loanHistory.entity").LoanHistory>;
    deleteLoanHistory(id: string): Promise<{
        id: number;
    }>;
}
