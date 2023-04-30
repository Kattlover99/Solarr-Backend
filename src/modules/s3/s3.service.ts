import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { ConfigService } from 'src/config/config.service';

@Injectable()
export class S3Service {
  private bucket = null;
  private s3 = null;

  constructor(private configService: ConfigService) {
    this.bucket = this.configService.awsS3Bucket;
    this.s3 = new AWS.S3({
      accessKeyId: this.configService.awsS3AccessKey,
      secretAccessKey: this.configService.awsS3KeySecret,
      region: 'ap-east-1'
    });
  }

  async uploadFile(file: any) {
    const { buffer, originalname, mimetype, path } = file;
    const timestamp = new Date().getTime();
    const filename = `${timestamp}_${originalname}`;
    const key = path ? `${path}/${String(filename)}` : String(filename);

    const params = {
      Bucket: this.bucket,
      Key: key,
      Body: buffer,
      ACL: 'public-read',
      ContentType: mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: 'ap-east-1'
      }
    };

    try {
      const s3Response = await this.s3.upload(params).promise();
      return s3Response;
    } catch (error) {
      throw error;
    }
  }
}
