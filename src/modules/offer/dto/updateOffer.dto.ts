import { ApiProperty } from '@nestjs/swagger';

export class UpdateOfferDto {
  @ApiProperty()
  loanAmount: number;

  @ApiProperty()
  loanType: boolean;

  @ApiProperty()
  period: number;

  @ApiProperty()
  apr: number;

  @ApiProperty()
  state: number;
}
