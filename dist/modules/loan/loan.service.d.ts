import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { LoanDto } from './dto/loan.dto';
import { Loan } from './entities/loan.entity';
import { UpdateLoanDto } from './dto/updateLoan.dto';
import { LoanHistoryService } from '../loanHistory/loanHistory.service';
import { NotificationService } from '../notification/notification.service';
import { Nft } from '../nft/entities/nft.entity';
import { Offer } from '../offer/entities/offer.entity';
import { List } from '../list/entities/list.entity';
export declare class LoanService {
    private listRepository;
    private loanRepository;
    private nftRepository;
    private offerRepository;
    private loanHistoryService;
    private notificationService;
    constructor(listRepository: Repository<List>, loanRepository: Repository<Loan>, nftRepository: Repository<Nft>, offerRepository: Repository<Offer>, loanHistoryService: LoanHistoryService, notificationService: NotificationService);
    createLoan(loanDto: LoanDto): Promise<Loan>;
    getLoans(options: IPaginationOptions): Promise<import("nestjs-typeorm-paginate").Pagination<Loan, import("nestjs-typeorm-paginate").IPaginationMeta>>;
    getLoansOfNft(collectionAddress: string, tokenId: string, options: IPaginationOptions): Promise<import("nestjs-typeorm-paginate").Pagination<Loan, import("nestjs-typeorm-paginate").IPaginationMeta>>;
    getLoansLiquified(borrowerId: string, options: IPaginationOptions): Promise<import("nestjs-typeorm-paginate").Pagination<Loan, import("nestjs-typeorm-paginate").IPaginationMeta>>;
    getLoansSupplied(lenderId: string, options: IPaginationOptions): Promise<import("nestjs-typeorm-paginate").Pagination<Loan, import("nestjs-typeorm-paginate").IPaginationMeta>>;
    getLoan(borrowerId: string, collectionAddress: string, tokenId: string, state: number): Promise<Loan>;
    updateLoan(id: string, updateLoanDto: UpdateLoanDto): Promise<Loan>;
    deleteLoan(id: string): Promise<{
        id: number;
    }>;
}
