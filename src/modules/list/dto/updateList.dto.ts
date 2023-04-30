import { ApiProperty } from '@nestjs/swagger';

export class UpdateListDto {
  @ApiProperty()
  loanAmount: number;

  @ApiProperty()
  loanType: boolean;

  @ApiProperty()
  period: number;

  @ApiProperty()
  apr: number;
}
