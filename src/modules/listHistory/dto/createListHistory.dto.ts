import { ApiProperty } from '@nestjs/swagger';

export class CreateListHistoryDto {
  @ApiProperty()
  action: number;

  @ApiProperty()
  listId: number;
}
