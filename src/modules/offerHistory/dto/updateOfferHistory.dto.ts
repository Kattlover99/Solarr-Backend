import { ApiProperty } from '@nestjs/swagger';

export class UpdateOfferHistoryDto {
  @ApiProperty()
  action?: number;

  @ApiProperty()
  offerId?: number;
}
