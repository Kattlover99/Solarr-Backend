import { Module } from '@nestjs/common';
import { ConfigModule } from 'src/config/config.module';
import { S3Service } from './s3.service';

@Module({
  imports: [ConfigModule],
  providers: [S3Service],
  exports: [S3Service]
})
export class S3Module {}
