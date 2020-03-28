import '@shared/config/dotenv';
import { extractEnvironmentVariable } from '@shared/utils/extract-environment-variable';

const ENVIRONMENT = {
  NODE_ENV: extractEnvironmentVariable('NODE_ENV'),
};

export default ENVIRONMENT;
