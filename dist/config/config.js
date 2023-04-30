"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('config', () => ({
    port: process.env.PORT,
    env: process.env.ENV,
    dbHost: process.env.DB_HOST,
    dbPort: process.env.DB_PORT,
    dbUser: process.env.DB_USER,
    dbPass: process.env.DB_PASS,
    dbName: process.env.DB_NAME,
    entities: [`${__dirname}/../modules/**/*.entity.{js,ts}`],
    migrations: [`${__dirname}/../migrations/**/*.{js,ts}`],
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiry: process.env.JWT_EXPIRES_IN,
    awsS3Bucket: process.env.AWS_S3_BUCKET,
    awsS3AccessKey: process.env.AWS_S3_ACCESS_KEY,
    awsS3KeySecret: process.env.AWS_S3_KEY_SECRET,
    sendgridKey: process.env.SENDGRID_KEY
}));
//# sourceMappingURL=config.js.map