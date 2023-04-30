import { ApiProperty } from '@nestjs/swagger';

export class GenerateNonceDto {
  @ApiProperty()
  address: string;
}
