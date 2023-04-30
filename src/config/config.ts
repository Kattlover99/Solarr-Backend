import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  port: process.env.PORT,
  env: process.env.ENV,
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbUser: process.env.DB_USER,
  dbPass: process.env.DB_PASS,
  dbName: process.env.DB_NAME,

  // TypeORM configurations
  entities: [`${__dirname}/../modules/**/*.entity.{js,ts}`],
  migrations: [`${__dirname}/../migrations/**/*.{js,ts}`],

  // JWT
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiry: process.env.JWT_EXPIRES_IN,

  // AWS
  awsS3Bucket: process.env.AWS_S3_BUCKET,
  awsS3AccessKey: process.env.AWS_S3_ACCESS_KEY,
  awsS3KeySecret: process.env.AWS_S3_KEY_SECRET,

  // Sendgrid
  sendgridKey: process.env.SENDGRID_KEY
}));
