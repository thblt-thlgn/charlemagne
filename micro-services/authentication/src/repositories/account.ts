import { sequelize } from '@src/config/database';
import { Account } from '@src/models';
import { InvalidCredentialsError, ResourceNotFoundError, Credential } from '@src/ts';
import { Transaction, WhereOptions, FindOptions } from 'sequelize/types';
import * as crypto from 'crypto';
import { ACCOUNT_ROLE } from '@shared/ts';
import { Service } from 'typedi';

@Service()
export default class AccountRepository {
  private repository = sequelize.getRepository(Account);

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

    return account;
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
