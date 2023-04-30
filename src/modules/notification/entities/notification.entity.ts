import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

import { CoreEntity } from 'src/core/typeorm/core.entity';
import { Nft } from 'src/modules/nft/entities/nft.entity';
import { User } from 'src/modules/user/entities/user.entity';

@Entity('notifications')
export class Notification extends CoreEntity {
  @Column({ default: null })
  status: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'collection_address' })
  collectionAddress: string;

  @Column({ name: 'token_id' })
  tokenId: string;

  @Column({ name: 'is_read', default: false })
  isRead: boolean;

  @ManyToOne(() => User, (user: User) => user.id, {
    cascade: ['update', 'remove']
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  timeDifference: number;
  imageUrl: string;
}
