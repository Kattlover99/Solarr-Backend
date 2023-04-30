import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { CoreEntity } from 'src/core/typeorm/core.entity';
import { Collection } from 'src/modules/collection/entities/collection.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { List } from 'src/modules/list/entities/list.entity';
import { Offer } from 'src/modules/offer/entities/offer.entity';

@Entity('nfts')
export class Nft extends CoreEntity {
  @Column({ default: null })
  name: string;

  @Column({ name: 'token_id', default: null })
  tokenId: string;

  @Column({ default: null })
  state: number;

  @Column('text', { default: null })
  metadata: string;

  @Column({ name: 'collection_floor', default: null })
  collectionFloor: number;

  @Column({ name: 'back_valuation', default: null })
  bankValuation: number;

  @Column({ name: 'owner_id' })
  ownerId: number;

  @Column({ name: 'collection_id' })
  collectionId: number;

  @ManyToOne(() => User, (owner: User) => owner.id, {
    cascade: ['update', 'remove']
  })
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @ManyToOne(() => Collection, (collection: Collection) => collection.id, {
    cascade: ['update', 'remove']
  })
  @JoinColumn({ name: 'collection_id' })
  collection: Collection;

  list?: List;
  offer?: Offer;
}
