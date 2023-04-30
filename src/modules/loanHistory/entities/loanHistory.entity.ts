import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

import { CoreEntity } from 'src/core/typeorm/core.entity';
import { Loan } from 'src/modules/loan/entities/loan.entity';
import { User } from 'src/modules/user/entities/user.entity';

@Entity('loanhistory')
export class LoanHistory extends CoreEntity {
  @Column({ default: null })
  action: number;

  @Column({ name: 'lender_id' })
  lenderId: number;

  @Column({ name: 'borrower_id' })
  borrowerId: number;

  @Column({ name: 'loan_id' })
  loanId: number;

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

  @ManyToOne(() => Loan, (loan: Loan) => loan.id, {
    cascade: ['update', 'remove']
  })
  @JoinColumn({ name: 'loan_id' })
  loan: Loan;
}
