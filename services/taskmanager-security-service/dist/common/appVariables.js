"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appStage = global.__TEST__ !== undefined ? global.__TEST__ : process.env.STAGE;
exports.DB_NAME = `${process.env.DB_NAME}`;
exports.DB_HOST = process.env.DB_HOST;
exports.DB_CONNECTION_POOL = Number(process.env.DB_CONNECTION_POOL);
exports.globalConst = {
    stage: appStage
};
//# sourceMappingURL=appVariables.js.map