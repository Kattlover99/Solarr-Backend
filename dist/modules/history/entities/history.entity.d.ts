import { CoreEntity } from 'src/core/typeorm/core.entity';
import { User } from 'src/modules/user/entities/user.entity';
export declare class History extends CoreEntity {
    type: number;
    lenderAtion: number;
    borrowerAtion: number;
    userId: number;
    collectionAddress: string;
    tokenId: string;
    user: User;
}
