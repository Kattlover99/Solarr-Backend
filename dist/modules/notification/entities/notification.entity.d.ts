import { CoreEntity } from 'src/core/typeorm/core.entity';
import { User } from 'src/modules/user/entities/user.entity';
export declare class Notification extends CoreEntity {
    status: number;
    userId: number;
    collectionAddress: string;
    tokenId: string;
    isRead: boolean;
    user: User;
    timeDifference: number;
    imageUrl: string;
}
