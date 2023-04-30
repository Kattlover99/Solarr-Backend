import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { CoreEntity } from 'src/core/typeorm/core.entity';
import { User } from 'src/modules/user/entities/user.entity';

@Entity('offers')
export class Offer extends CoreEntity {
  @Column({ default: null })
  state: number;

  @Column('decimal', { name: 'loan_amount', default: null, precision: 32, scale: 16 })
  loanAmount: number;

  @Column({ default: null })
  period: number;

  @Column({ default: null, precision: 32, scale: 16 })
  apr: number;

  @Column({ name: 'loan_type' })
  loanType: boolean;

  @Column({ name: 'lender_id', default: null })
  lenderId: number;

  @Column({ name: 'borrower_id', default: null })
  borrowerId: number;

  @Column({ name: 'collection_address' })
  collectionAddress: string;

  @Column({ name: 'token_id' })
  tokenId: string;

  @ManyToOne(() => User, (lender: User) => lender.id, {
    cascade: ['update', 'remove']
  })
  @JoinColumn({ name: 'lender_id' })
  lender: User;

  @ManyToOne(() => User, (borrower: User) => borrower.id, {
    cascade: ['update', 'remove']
  })
  @JoinColumn({ name: 'borrower_id' })
  borrower: User;
}
