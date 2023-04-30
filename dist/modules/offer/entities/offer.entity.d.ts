import { CoreEntity } from 'src/core/typeorm/core.entity';
import { User } from 'src/modules/user/entities/user.entity';
export declare class Offer extends CoreEntity {
    state: number;
    loanAmount: number;
    period: number;
    apr: number;
    loanType: boolean;
    lenderId: number;
    borrowerId: number;
    collectionAddress: string;
    tokenId: string;
    lender: User;
    borrower: User;
}
