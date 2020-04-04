import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';
import { JWTValidator } from '@shared/services';
import Account from '@src/database/models/account';

const KEY_FOLDER = `${__dirname}/../../assets/keys`;
const PUBLIC_KEY = fs.readFileSync(`${KEY_FOLDER}/public.key`, 'utf8');
const PRIVATE_KEY = fs.readFileSync(`${KEY_FOLDER}/private.key`, 'utf8');

class JWTManager extends JWTValidator {
  constructor(public publicKey: string, private privateKey: string) {
    super(publicKey);
  }

  sign(account: Account, data: any) {
    return jwt.sign(data, this.privateKey, {
      ...this.jwtOptions,
      subject: account.email,
      keyid: `${account.id}`,
    });
  }
}

export const jwtManager = new JWTManager(PUBLIC_KEY, PRIVATE_KEY);
