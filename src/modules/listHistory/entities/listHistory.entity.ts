import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

import { CoreEntity } from 'src/core/typeorm/core.entity';
import { List } from 'src/modules/list/entities/list.entity';

@Entity('listhistory')
export class ListHistory extends CoreEntity {
  @Column({ default: null })
  action: number;

  @Column({ name: 'list_id' })
  listId: number;

  @ManyToOne(() => List, (list: List) => list.id, {
    cascade: ['update', 'remove']
  })
  @JoinColumn({ name: 'list_id' })
  list: List;
}
