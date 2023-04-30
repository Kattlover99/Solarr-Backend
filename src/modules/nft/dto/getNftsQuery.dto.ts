import { ApiProperty } from '@nestjs/swagger';

export class GetNftsQueryDto {
  @ApiProperty({ required: false })
  min: String;
  @ApiProperty({ required: false })
  max: String;
  @ApiProperty({ required: false })
  currency: String;
  @ApiProperty({ required: false })
  collectionId: String;
  @ApiProperty({ required: false })
  page: String;
  @ApiProperty({ required: false })
  limit: String;
}
