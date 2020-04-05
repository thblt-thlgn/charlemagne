import { sequelize } from '@src/config/database';
import { RefreshToken } from '../models';
import { Service } from 'typedi';
import { FindOptions } from 'sequelize/types';

@Service()
export default class RefreshTokenRepository {
  private repository = sequelize.getRepository(RefreshToken);

  public findAll(opts?: FindOptions) {
    return this.repository.findAll(opts);
  }
}
