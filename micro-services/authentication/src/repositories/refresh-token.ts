import { RefreshToken, Account } from '../models';
import { Service } from 'typedi';
import { FindOptions, Transaction, WhereOptions } from 'sequelize/types';
import { v4 as uuid } from 'uuid';
import { add } from 'date-fns';
import { ResourceNotFoundError, RequestData } from '@src/ts';
import db from '@src/config/database';

@Service()
export default class RefreshTokenRepository {
  private repository = db.getRepository(RefreshToken);

  public async find(where: WhereOptions, transaction?: Transaction) {
    const opts = transaction ? { transaction } : {};
    const refreshToken = await this.repository.findOne({ where, ...opts });
    if (!refreshToken) {
      throw new ResourceNotFoundError('refreshToken');
    }

    return refreshToken;
  }

  public findAll(opts?: FindOptions) {
    return this.repository.findAll(opts);
  }

  public create(account: Account, requestData: RequestData, transaction?: Transaction) {
    const opts = transaction ? { transaction } : {};
    return this.repository.create(
      {
        ...requestData,
        id: uuid(),
        accountId: account.id,
        expiry: add(new Date(), { weeks: 1 }),
      },
      opts,
    );
  }

  public async refresh(
    id: string,
    accountId: number,
    requestData: RequestData,
    transaction?: Transaction,
  ) {
    const opts = transaction ? { transaction } : {};
    let refreshToken = await this.repository.findOne({
      where: { id, accountId },
      ...opts,
    });

    if (!refreshToken) {
      throw new Error('Bad request'); // TODO: create generic error
    }

    const { account } = refreshToken;

    if (refreshToken.expiry < new Date()) {
      await refreshToken.destroy(opts);
      refreshToken = await this.create(account, requestData, transaction);
    }

    return refreshToken;
  }

  public async remove(id: string, accountId: number, transaction?: Transaction) {
    const opts = transaction ? { transaction } : {};
    const refreshToken = await this.repository.findOne({
      where: { id, accountId },
      ...opts,
    });

    if (!refreshToken) {
      throw new Error('Bad request'); // TODO: create generic error
    }

    return refreshToken.destroy(opts);
  }
}
