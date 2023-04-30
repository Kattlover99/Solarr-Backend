import { ApiProperty } from '@nestjs/swagger';

export class OfferDto {
  @ApiProperty()
  loanAmount: number;

  @ApiProperty()
  period: number;

  @ApiProperty()
  apr: number;

  @ApiProperty()
  loanType: boolean;

  @ApiProperty()
  borrowerId: number;

  @ApiProperty()
  lenderId: number;

  @ApiProperty()
  collectionAddress: string;

  @ApiProperty()
  tokenId: string;
}
