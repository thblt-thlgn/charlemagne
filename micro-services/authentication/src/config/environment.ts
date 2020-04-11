import '@shared/config/dotenv';
import { extractEnvironmentVariable } from '@shared/utils';
import { Dialect } from 'sequelize/types';

const ENVIRONMENT = {
  NODE_ENV: extractEnvironmentVariable('NODE_ENV'),
  // SERVER
  PORT: extractEnvironmentVariable<number>('PORT', 'integer'),
  HOSTNAME: extractEnvironmentVariable('HOSTNAME'),
  HTTPS_ENABLED: extractEnvironmentVariable<boolean>('HTTPS_ENABLED', 'boolean'),
  SERVICE_NAME: extractEnvironmentVariable('SERVICE_NAME'),
  // DATABASE
  DB_USERNAME: extractEnvironmentVariable(['DB_USERNAME', 'POSTGRES_USER']),
  DB_PASSWORD: extractEnvironmentVariable(['DB_PASSWORD', 'POSTGRES_PASSWORD']),
  DB_NAME: extractEnvironmentVariable('DB_NAME'),
  DB_HOST: extractEnvironmentVariable('DB_HOST'),
  DB_DIALECT: extractEnvironmentVariable('DB_DIALECT') as Dialect,
  DB_POOL_MAX: extractEnvironmentVariable<number>('DB_POOL_MAX', 'integer'),
  DB_POOL_MIN: extractEnvironmentVariable<number>('DB_POOL_MIN', 'integer'),
  DB_POOL_ACQUIRE: extractEnvironmentVariable<number>('DB_POOL_ACQUIRE', 'integer'),
  DB_POOL_IDLE: extractEnvironmentVariable<number>('DB_POOL_IDLE', 'integer'),
  DB_LOGGING: extractEnvironmentVariable<boolean>('DB_LOGGING', 'boolean'),
};

export default ENVIRONMENT;
