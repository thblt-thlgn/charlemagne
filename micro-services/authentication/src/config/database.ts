import { Sequelize } from 'sequelize-typescript';
import ENVIRONMENT from './environment';

export const sequelize = new Sequelize({
  host: ENVIRONMENT.DB_HOST,
  database: ENVIRONMENT.DB_NAME,
  dialect: ENVIRONMENT.DB_DIALECT,
  username: ENVIRONMENT.DB_USERNAME,
  password: ENVIRONMENT.DB_PASSWORD,
  pool: {
    max: ENVIRONMENT.DB_POOL_MAX,
    min: ENVIRONMENT.DB_POOL_MIN,
    acquire: ENVIRONMENT.DB_POOL_ACQUIRE,
    idle: ENVIRONMENT.DB_POOL_IDLE,
  },
  repositoryMode: true,
  models: [`${__dirname}/../entity/**/model.ts`],
});

export const models = {
  RefreshToken: sequelize.models.RefreshToken,
  Account: sequelize.models.Account,
};