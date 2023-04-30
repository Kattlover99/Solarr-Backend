import { ConfigService } from 'src/config/config.service';
export declare class S3Service {
    private configService;
    private bucket;
    private s3;
    constructor(configService: ConfigService);
    uploadFile(file: any): Promise<any>;
}
