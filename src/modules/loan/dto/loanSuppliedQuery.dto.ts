import { ApiProperty } from '@nestjs/swagger';

export class LoanSuppliedQueryDto {
  @ApiProperty({ required: true })
  lenderId: String;
  @ApiProperty({ default: 1, required: false })
  page: Number;
  @ApiProperty({ default: 8, required: false })
  limit: Number;
}
