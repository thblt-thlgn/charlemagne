import { Sequelize } from 'sequelize-typescript';
import ENVIRONMENT from './environment';
import * as models from '@src/models';

const db = new Sequelize({
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
  models: Object.values(models),
});

export default db;
