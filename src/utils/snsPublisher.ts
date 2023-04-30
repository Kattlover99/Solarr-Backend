import AWS, { SNS } from 'aws-sdk';

export const publisher = new SNS({
  region: 'ap-east-1'
});
