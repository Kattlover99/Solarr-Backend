"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3Service = void 0;
const common_1 = require("@nestjs/common");
const AWS = require("aws-sdk");
const config_service_1 = require("../../config/config.service");
let S3Service = class S3Service {
    constructor(configService) {
        this.configService = configService;
        this.bucket = null;
        this.s3 = null;
        this.bucket = this.configService.awsS3Bucket;
        this.s3 = new AWS.S3({
            accessKeyId: this.configService.awsS3AccessKey,
            secretAccessKey: this.configService.awsS3KeySecret,
            region: 'ap-east-1'
        });
    }
    async uploadFile(file) {
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
        }
        catch (error) {
            throw error;
        }
    }
};
S3Service = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_service_1.ConfigService])
], S3Service);
exports.S3Service = S3Service;
//# sourceMappingURL=s3.service.js.map