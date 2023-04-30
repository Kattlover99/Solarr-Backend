import { ApiProperty } from '@nestjs/swagger';
import { CreateNftDto } from 'src/modules/nft/dto/createNft.dto';

export class CreateListDto extends CreateNftDto {
  @ApiProperty()
  loanAmount: number;

  @ApiProperty()
  loanType: boolean;

  @ApiProperty()
  period: number;

  @ApiProperty()
  apr: number;

  @ApiProperty()
  borrowerId: number;

  @ApiProperty()
  collectionAddress: string;

  @ApiProperty()
  tokenId: string;

  @ApiProperty()
  metadata: string;
}
