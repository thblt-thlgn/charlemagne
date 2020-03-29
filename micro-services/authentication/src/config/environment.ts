import '@shared/config/dotenv';
import { extractEnvironmentVariable } from '@shared/utils';

const ENVIRONMENT = {
  NODE_ENV: extractEnvironmentVariable('NODE_ENV'),
  SERVER_PORT: extractEnvironmentVariable<number>('SERVER_PORT', 'integer'),
};

export default ENVIRONMENT;
