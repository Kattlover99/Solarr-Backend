import { ApiProperty } from '@nestjs/swagger';

export class UpdateLoanDto {
  @ApiProperty()
  state: number;
}
