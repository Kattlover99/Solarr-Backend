import { CoreEntity } from 'src/core/typeorm/core.entity';
import { Loan } from 'src/modules/loan/entities/loan.entity';
import { User } from 'src/modules/user/entities/user.entity';
export declare class LoanHistory extends CoreEntity {
    action: number;
    lenderId: number;
    borrowerId: number;
    loanId: number;
    lender: User;
    borrower: User;
    loan: Loan;
}
