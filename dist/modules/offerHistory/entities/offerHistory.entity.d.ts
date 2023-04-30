import { CoreEntity } from 'src/core/typeorm/core.entity';
import { Offer } from 'src/modules/offer/entities/offer.entity';
export declare class OfferHistory extends CoreEntity {
    action: number;
    offerId: number;
    offer: Offer;
}
