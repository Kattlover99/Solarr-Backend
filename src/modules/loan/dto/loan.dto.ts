import { ApiProperty } from '@nestjs/swagger';

export class LoanDto {
  @ApiProperty()
  state: number;

  @ApiProperty()
  borrowerId: number;

  @ApiProperty()
  lenderId: number;

  @ApiProperty()
  collectionAddress: string;

  @ApiProperty()
  tokenId: string;

  @ApiProperty()
  acceptedOfferId: number;
}
