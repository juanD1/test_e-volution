"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const accessKeyId = process.env.AWS_API_ACCESS_KEY;
const secretAccessKey = process.env.AWS_API_SECRET_KEY;
const awsRegion = process.env.AWS_API_REGION;
const mapKey = process.env.GOOGLE_MAPS_KEY;
// const appStage = global.__TEST__ !== undefined ? global.__TEST__ : process.env.STAGE;
exports.BUCKET_NAME = process.env.BUCKET_NAME;
// export const DB_NAME = `${appStage}_${process.env.DB_NAME}`;
exports.DB_NAME = `${process.env.DB_NAME}`;
exports.DB_HOST = process.env.DB_HOST;
exports.DB_CONNECTION_POOL = Number(process.env.DB_CONNECTION_POOL);
// export const awsConfig = {
//   accessKeyId: accessKeyId,
//   secretAccessKey: secretAccessKey,
//   region: awsRegion,
// };
// export const globalConst = {
//   stage: appStage,
// }
// export const mapConfig = {
//   key: mapKey
// }
//# sourceMappingURL=appVariables.js.map