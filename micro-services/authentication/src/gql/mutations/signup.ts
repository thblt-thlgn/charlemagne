import { sequelize } from 'src/config/database';
import { Transaction } from 'sequelize/types';
import * as crypto from 'crypto';
import Account from '../../database/models/account';
import { ACCOUNT_ROLE } from '@shared/ts';
import { Credential } from '@src/ts/interfaces';

const repository = sequelize.getRepository(Account);

const signup = ({ email, password }: Credential) => {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return repository.create({
    email,
    salt,
    hash,
    role: [ACCOUNT_ROLE.USER],
    verifiedAt: new Date(), // TODO: implement verification mechanism
  });
};

export default signup;
