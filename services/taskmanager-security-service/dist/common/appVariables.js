"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appStage = global.__TEST__ !== undefined ? global.__TEST__ : process.env.STAGE;
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