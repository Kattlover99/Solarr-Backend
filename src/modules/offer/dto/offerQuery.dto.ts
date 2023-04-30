import { ApiProperty } from '@nestjs/swagger';

export class OfferQueryDto {
  @ApiProperty({ required: true })
  lenderId: String;
  @ApiProperty({ required: true })
  collectionAddress: String;
  @ApiProperty({ required: true })
  tokenId: String;
  @ApiProperty()
  state: Number;
}
