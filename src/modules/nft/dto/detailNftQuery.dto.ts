import { ApiProperty } from '@nestjs/swagger';

export class DetailNftQueryDto {
  @ApiProperty({ required: true })
  collectionAddress: String;
  @ApiProperty({ required: true })
  tokenId: String;
}
