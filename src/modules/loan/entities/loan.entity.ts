import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { CoreEntity } from 'src/core/typeorm/core.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Offer } from 'src/modules/offer/entities/offer.entity';

@Entity('loans')
export class Loan extends CoreEntity {
  @Column({ default: null })
  state: number;

  @Column({ name: 'lender_id' })
  lenderId: number;

  @Column({ name: 'borrower_id' })
  borrowerId: number;

  @Column({ name: 'collection_address' })
  collectionAddress: string;

  @Column({ name: 'token_id' })
  tokenId: string;

  @Column({ name: 'accepted_offer_id' })
  acceptedOfferId: number;

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

  @ManyToOne(() => Offer, (offer: Offer) => offer.id, {
    cascade: ['update', 'remove']
  })
  @JoinColumn({ name: 'accepted_offer_id' })
  offer: Offer;
}
