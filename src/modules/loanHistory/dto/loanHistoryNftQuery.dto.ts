import { ApiProperty } from '@nestjs/swagger';

export class LoanHistoryNftQueryDto {
  @ApiProperty({ required: true })
  collectionAddress: String;
  @ApiProperty({ required: true })
  tokenId: String;
  @ApiProperty({ default: 1, required: false })
  page: Number;
  @ApiProperty({ default: 6, required: false })
  limit: Number;
}
