import { CoreEntity } from 'src/core/typeorm/core.entity';
import { User } from 'src/modules/user/entities/user.entity';
export declare class List extends CoreEntity {
    loanAmount: number;
    loanType: boolean;
    period: number;
    apr: number;
    borrowerId: number;
    collectionAddress: string;
    tokenId: string;
    metadata: string;
    borrower: User;
    isOffered: boolean;
}
