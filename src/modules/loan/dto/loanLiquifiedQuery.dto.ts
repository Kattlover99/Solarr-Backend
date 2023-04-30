import { ApiProperty } from '@nestjs/swagger';

export class LoanLiquifiedQueryDto {
  @ApiProperty({ required: true })
  borrowerId: String;
  @ApiProperty({ default: 1, required: false })
  page: Number;
  @ApiProperty({ default: 8, required: false })
  limit: Number;
}
