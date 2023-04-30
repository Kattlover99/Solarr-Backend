"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publisher = void 0;
const aws_sdk_1 = require("aws-sdk");
exports.publisher = new aws_sdk_1.SNS({
    region: 'ap-east-1'
});
//# sourceMappingURL=snsPublisher.js.map