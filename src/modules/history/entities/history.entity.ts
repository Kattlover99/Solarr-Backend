import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { CoreEntity } from 'src/core/typeorm/core.entity';
import { Nft } from 'src/modules/nft/entities/nft.entity';
import { User } from 'src/modules/user/entities/user.entity';

@Entity('history')
export class History extends CoreEntity {
  @Column({ name: 'loan_amount', default: null })
  type: number;

  @Column({ name: 'lender_action', default: null })
  lenderAtion: number;

  @Column({ name: 'borrower_action', default: null })
  borrowerAtion: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'collection_address' })
  collectionAddress: string;

  @Column({ name: 'token_id' })
  tokenId: string;

  @ManyToOne(() => User, (user: User) => user.id, {
    cascade: ['update', 'remove']
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
