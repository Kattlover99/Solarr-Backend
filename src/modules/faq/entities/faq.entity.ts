import { Column, Entity } from 'typeorm';
import { CoreEntity } from 'src/core/typeorm/core.entity';

@Entity('faq')
export class Faq extends CoreEntity {
  @Column({ default: null })
  type: number;

  @Column('text', { default: null })
  question: string;

  @Column('text', { default: null })
  content: string;
}
