import { ApiProperty } from '@nestjs/swagger';

export class CreateNftDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  tokenId: string;

  @ApiProperty()
  state: number;

  @ApiProperty()
  metadata: string;

  @ApiProperty()
  collectionFloor: number;

  @ApiProperty()
  bankValuation: number;

  @ApiProperty()
  ownerId: number;

  @ApiProperty()
  collectionAddress: string;
}
