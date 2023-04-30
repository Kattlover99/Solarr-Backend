import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty()
  username?: string;

  @ApiProperty()
  avatar?: string;
}
