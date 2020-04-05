import { sequelize } from '@src/config/database';
import { Credential } from '@src/ts/interfaces';
import { Account } from '@src/models';
import { InvalidCredentialsError, ResourceNotFoundError } from '@src/ts';
import { jwtManager } from '@src/config/jwt-manager';
import { Transaction, WhereOptions, FindOptions } from 'sequelize/types';
import * as crypto from 'crypto';
import { ACCOUNT_ROLE } from '@shared/ts';
import { pick } from 'lodash';
import { Service } from 'typedi';

@Service()
export default class AccountRepository {
  private repository = sequelize.getRepository(Account);

  private filter(account: Account) {
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

  public async login({ email, password }: Credential, transaction?: Transaction) {
    const account = await this.find({ email }, transaction).catch(() =>
      Promise.reject(new InvalidCredentialsError()),
    );

    if (!account.salt || !account.hash) {
      throw new InvalidCredentialsError();
    }

    const hash = crypto.pbkdf2Sync(password, account.salt, 1000, 64, 'sha512').toString('hex');

    if (hash !== account.hash) {
      throw new InvalidCredentialsError();
    }

    const jwt = jwtManager.sign(account, this.filter(account));
    return { jwt, account };
  }

  public signup({ email, password }: Credential, transaction?: Transaction) {
    const opts = transaction ? { transaction } : {};
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return this.repository.create(
      {
        email,
        salt,
        hash,
        role: [ACCOUNT_ROLE.USER],
        verifiedAt: new Date(), // TODO: implement verification mechanism
      },
      opts,
    );
  }

  public async find(where: WhereOptions, transaction?: Transaction) {
    const opts = transaction ? { transaction } : {};
    const account = await this.repository.findOne({ where, ...opts });
    if (!account) {
      throw new ResourceNotFoundError('account');
    }

    return account;
  }

  public findAll(opts?: FindOptions) {
    return this.repository.findAll(opts);
  }
}
