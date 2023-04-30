import { ApiProperty } from '@nestjs/swagger';

export class VerifySignatureDto {
  @ApiProperty()
  address: string;

  @ApiProperty()
  signature: string;
}
