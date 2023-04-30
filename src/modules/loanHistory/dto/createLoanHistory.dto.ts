import { ApiProperty } from '@nestjs/swagger';

export class CreateLoanHistoryDto {
  @ApiProperty()
  action: number;

  @ApiProperty()
  borrowerId: number;

  @ApiProperty()
  lenderId: number;

  @ApiProperty()
  loanId: number;
}
