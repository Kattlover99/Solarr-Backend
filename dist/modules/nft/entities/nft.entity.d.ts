import { CoreEntity } from 'src/core/typeorm/core.entity';
import { Collection } from 'src/modules/collection/entities/collection.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { List } from 'src/modules/list/entities/list.entity';
import { Offer } from 'src/modules/offer/entities/offer.entity';
export declare class Nft extends CoreEntity {
    name: string;
    tokenId: string;
    state: number;
    metadata: string;
    collectionFloor: number;
    bankValuation: number;
    ownerId: number;
    collectionId: number;
    owner: User;
    collection: Collection;
    list?: List;
    offer?: Offer;
}
