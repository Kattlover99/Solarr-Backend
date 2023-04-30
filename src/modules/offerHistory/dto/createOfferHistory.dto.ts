import { ApiProperty } from '@nestjs/swagger';

export class CreateOfferHistoryDto {
  @ApiProperty()
  action: number;

  @ApiProperty()
  offerId: number;
}
