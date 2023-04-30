import { ApiProperty } from '@nestjs/swagger';

export class CreateHistoryDto {
  @ApiProperty()
  type: number;

  @ApiProperty()
  borrowerAction: number;

  @ApiProperty()
  lenderAction: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  collectionAddress: string;

  @ApiProperty()
  tokenId: string;
}
