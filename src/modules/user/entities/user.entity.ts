import { Column, Entity, OneToMany } from 'typeorm';
import { CoreEntity } from 'src/core/typeorm/core.entity';

@Entity('users')
export class User extends CoreEntity {
  @Column()
  nonce: string;

  @Column({ default: null })
  username: string;

  @Column({ name: 'wallet_address', unique: true })
  walletAddress: string;

  @Column({ default: null })
  avatar: string;

  totalLiquified: number;
  averageLiquified: number;
  averageLiquifiedPeriod: number;

  totalSupplied: number;
  averageSupplied: number;
  averageSuppliedPeriod: number;

  liquified: number;
  supplied: number;

  returned: number;
  breached: number;
}
