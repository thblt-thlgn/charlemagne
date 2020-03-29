import { assert } from 'console';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

assert(!!process.env.NODE_ENV, 'Missing env variable NODE_ENV');
const basePath = path.resolve();

const configs = [
  path.join(basePath, `.env.${process.env.NODE_ENV}.local`),
  path.join(basePath, `.env.${process.env.NODE_ENV}`),
  path.join(basePath, `.env`),
];

configs.forEach((path) => {
  if (fs.existsSync(path)) {
    dotenv.config({ path });
  }
});
