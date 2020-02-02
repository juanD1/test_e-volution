const appStage = global.__TEST__ !== undefined ? global.__TEST__ : process.env.STAGE;

export const DB_NAME = `${process.env.DB_NAME}`;
export const DB_HOST = process.env.DB_HOST;
export const DB_CONNECTION_POOL = Number(process.env.DB_CONNECTION_POOL);

export const globalConst = {
  stage: appStage
}