import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';
import { JWTValidator } from '@shared/services';
import { Account } from '@src/models';
import { pick } from 'lodash';

const KEY_FOLDER = `${__dirname}/../../assets/keys`;
const PUBLIC_KEY = fs.readFileSync(`${KEY_FOLDER}/public.key`, 'utf8');
const PRIVATE_KEY = fs.readFileSync(`${KEY_FOLDER}/private.key`, 'utf8');

class JWTManager extends JWTValidator {
  constructor(public publicKey: string, private privateKey: string) {
    super(publicKey);
  }

  private filterAccount(account: Account) {
    return pick(account.toJSON(), [
      'id',
      'email',
      'role',
      'provider',
      'createdAt',
      'updatedAt',
      'verifiedAt',
    ]);
  }

  sign(account: Account) {
    const data = this.filterAccount(account);
    return jwt.sign(data, this.privateKey, {
      ...this.jwtOptions,
      subject: account.email,
      keyid: `${account.id}`,
    });
  }
}

export const jwtManager = new JWTManager(PUBLIC_KEY, PRIVATE_KEY);
