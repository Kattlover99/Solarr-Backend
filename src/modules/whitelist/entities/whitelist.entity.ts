import { Column, Entity } from 'typeorm';

import { CoreEntity } from 'src/core/typeorm/core.entity';

@Entity('whitelists')
export class Whitelist extends CoreEntity {
  @Column({ name: 'collection_address', default: null })
  collectionAddress: string;

  @Column({ name: 'token_id', default: null })
  tokenId: string;
}
