import { ApiProperty } from '@nestjs/swagger';

export class GetListDto {
  @ApiProperty()
  lenderId: number;
}
