import { LoanService } from './loan.service';
import { LoanDto } from './dto/loan.dto';
import { UpdateLoanDto } from './dto/updateLoan.dto';
export declare class LoanController {
    private loanService;
    constructor(loanService: LoanService);
    createLoan(loanDto: LoanDto): Promise<import("./entities/loan.entity").Loan>;
    getLoans(page?: number, limit?: number): Promise<import("nestjs-typeorm-paginate").Pagination<import("./entities/loan.entity").Loan, import("nestjs-typeorm-paginate").IPaginationMeta>>;
    getLoansOfNft(collectionAddress: any, tokenId: any, page?: number, limit?: number): Promise<import("nestjs-typeorm-paginate").Pagination<import("./entities/loan.entity").Loan, import("nestjs-typeorm-paginate").IPaginationMeta>>;
    getLoansLiquified(borrowerId: any, page?: number, limit?: number): Promise<import("nestjs-typeorm-paginate").Pagination<import("./entities/loan.entity").Loan, import("nestjs-typeorm-paginate").IPaginationMeta>>;
    getLoansSupplied(lenderId: any, page?: number, limit?: number): Promise<import("nestjs-typeorm-paginate").Pagination<import("./entities/loan.entity").Loan, import("nestjs-typeorm-paginate").IPaginationMeta>>;
    getLoan(borrowerId: any, collectionAddress: any, tokenId: any, state?: number): Promise<import("./entities/loan.entity").Loan>;
    updateLoan(id: string, updateLoanDto: UpdateLoanDto): Promise<import("./entities/loan.entity").Loan>;
    deleteLoan(id: string): Promise<{
        id: number;
    }>;
}
