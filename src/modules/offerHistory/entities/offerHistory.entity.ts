import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

import { CoreEntity } from 'src/core/typeorm/core.entity';
import { Offer } from 'src/modules/offer/entities/offer.entity';

@Entity('offerhistory')
export class OfferHistory extends CoreEntity {
  @Column({ default: null })
  action: number;

  @Column({ name: 'offer_id' })
  offerId: number;

  @ManyToOne(() => Offer, (offer: Offer) => offer.id, {
    cascade: ['update', 'remove']
  })
  @JoinColumn({ name: 'offer_id' })
  offer: Offer;
}
