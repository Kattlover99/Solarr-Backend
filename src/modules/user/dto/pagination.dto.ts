import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @ApiProperty({ default: 1, required: false })
  page: Number;
  @ApiProperty({ default: 10, required: false })
  limit: Number;
}
