import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { CoreEntity } from 'src/core/typeorm/core.entity';
import { User } from 'src/modules/user/entities/user.entity';

@Entity('lists')
export class List extends CoreEntity {
  @Column('decimal', { name: 'loan_amount', default: null, precision: 32, scale: 16 })
  loanAmount: number;

  @Column({ name: 'loan_type', default: null })
  loanType: boolean;

  @Column({ default: null })
  period: number;

  @Column({ default: null, precision: 32, scale: 16 })
  apr: number;

  @Column({ name: 'borrower_id', default: null })
  borrowerId: number;

  @Column({ name: 'collection_address' })
  collectionAddress: string;

  @Column({ name: 'token_id' })
  tokenId: string;

  @Column('text', { name: 'metadata' })
  metadata: string;

  @ManyToOne(() => User, (borrower: User) => borrower.id, {
    cascade: ['update', 'remove']
  })
  @JoinColumn({ name: 'borrower_id' })
  borrower: User;

  isOffered: boolean;
}
