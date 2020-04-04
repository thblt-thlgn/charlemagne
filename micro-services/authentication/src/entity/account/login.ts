import { jwtManager } from '@src/config/jwt-manager';
import { sequelize } from 'src/config/database';
import { Transaction } from 'sequelize/types';
import { pick } from 'lodash';
import * as crypto from 'crypto';
import Account from './model';
import { InvalidCredentialsError } from '@src/ts';
import { Credential } from '@src/ts/interfaces';

const repository = sequelize.getRepository(Account);

const filterAccount = (account: Account) =>
  pick(account.toJSON(), [
    'id',
    'email',
    'role',
    'provider',
    'createdAt',
    'updatedAt',
    'verifiedAt',
  ]);

const login = async ({ email, password }: Credential) => {
  const account = await repository.findOne({ where: { email } });

  if (!account || !account.salt || !account.hash) {
    throw new InvalidCredentialsError();
  }

  const hash = crypto.pbkdf2Sync(password, account.salt, 1000, 64, 'sha512').toString('hex');
  if (hash !== account.hash) {
    throw new InvalidCredentialsError();
  }

  const jwt = jwtManager.sign(account, filterAccount(account));
  return { jwt, account };
};

export default login;
