import * as fs from 'fs';
import { JWTValidator } from '@shared/services';

const KEY_FOLDER = `${__dirname}/../../assets/keys`;
const PUBLIC_KEY = fs.readFileSync(`${KEY_FOLDER}/authentication.pub.key`, 'utf8');

const jwtValidator = new JWTValidator(PUBLIC_KEY);

export default jwtValidator;
