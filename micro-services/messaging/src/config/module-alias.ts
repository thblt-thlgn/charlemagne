import * as moduleAlias from 'module-alias';
import { assert } from 'console';
import * as path from 'path';

assert(!!process.env.NODE_ENV, 'Missing env variable NODE_ENV');
const ROOT = path.resolve();

if (process.env.NODE_ENV === 'development') {
  moduleAlias.addAlias('@shared', path.join(ROOT, '../libraries/dist/@shared'));
  moduleAlias.addAlias('@src', path.join(ROOT, 'dist'));
}
