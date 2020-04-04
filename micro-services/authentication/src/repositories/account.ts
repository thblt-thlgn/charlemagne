import { sequelize } from '@src/config/database';
import { Credential } from '@src/ts/interfaces';
import { Account } from '@src/models';
import { InvalidCredentialsError, ResourceNotFoundError } from '@src/ts';
import { jwtManager } from '@src/config/jwt-manager';
import { Transaction, WhereOptions } from 'sequelize/types';
import * as crypto from 'crypto';
import { ACCOUNT_ROLE } from '@shared/ts';
import { pick } from 'lodash';

namespace AccountRepository {
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

  export const repository = sequelize.getRepository(Account);

  export const login = async ({ email, password }: Credential, transaction?: Transaction) => {
    const account = await find({ email }, transaction).catch(() =>
      Promise.reject(new InvalidCredentialsError()),
    );

    if (!account.salt || !account.hash) {
      throw new InvalidCredentialsError();
    }

    const hash = crypto.pbkdf2Sync(password, account.salt, 1000, 64, 'sha512').toString('hex');

    if (hash !== account.hash) {
      throw new InvalidCredentialsError();
    }

    const jwt = jwtManager.sign(account, filterAccount(account));
    return { jwt, account };
  };

  export const signup = ({ email, password }: Credential, transaction?: Transaction) => {
    const opts = transaction ? { transaction } : {};
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return repository.create(
      {
        email,
        salt,
        hash,
        role: [ACCOUNT_ROLE.USER],
        verifiedAt: new Date(), // TODO: implement verification mechanism
      },
      opts,
    );
  };

  export const find = async (where: WhereOptions, transaction?: Transaction) => {
    const opts = transaction ? { transaction } : {};
    const account = await repository.findOne({ where, ...opts });
    if (!account) {
      throw new ResourceNotFoundError('account');
    }

    return account;
  };
}

export default AccountRepository;
