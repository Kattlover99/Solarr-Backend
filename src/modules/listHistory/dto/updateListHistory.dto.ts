import { ApiProperty } from '@nestjs/swagger';

export class UpdateListHistoryDto {
  @ApiProperty()
  action?: number;

  @ApiProperty()
  listId?: number;
}
