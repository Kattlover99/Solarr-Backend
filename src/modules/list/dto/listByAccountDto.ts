import { ApiProperty } from '@nestjs/swagger';

export class ListByAccountDto {
  @ApiProperty()
  borrowerId: number;

  @ApiProperty()
  nfts: [];

  @ApiProperty()
  checkOwnership: boolean;
}
