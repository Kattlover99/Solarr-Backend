import { ApiProperty } from '@nestjs/swagger';

export class CreateWhitelistDto {
  @ApiProperty()
  collectionAddress: string;

  @ApiProperty()
  tokenId: string;
}
