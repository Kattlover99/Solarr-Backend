import { CoreEntity } from 'src/core/typeorm/core.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Offer } from 'src/modules/offer/entities/offer.entity';
export declare class Loan extends CoreEntity {
    state: number;
    lenderId: number;
    borrowerId: number;
    collectionAddress: string;
    tokenId: string;
    acceptedOfferId: number;
    lender: User;
    borrower: User;
    offer: Offer;
}
