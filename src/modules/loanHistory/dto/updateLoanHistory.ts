import { ApiProperty } from '@nestjs/swagger';

export class UpdateLoanHistoryDto {
  @ApiProperty()
  action?: number;

  @ApiProperty()
  borrowerId?: number;

  @ApiProperty()
  lenderId?: number;

  @ApiProperty()
  loanId?: number;
}
