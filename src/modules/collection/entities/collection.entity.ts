import { Column, Entity } from 'typeorm';

import { CoreEntity } from 'src/core/typeorm/core.entity';

@Entity('collections')
export class Collection extends CoreEntity {
  @Column({ default: null })
  name: string;

  @Column({ default: null })
  address: string;

  @Column({ default: false })
  whitelisted: boolean;
}
