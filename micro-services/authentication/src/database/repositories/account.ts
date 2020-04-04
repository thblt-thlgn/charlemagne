import { sequelize } from '@src/config/database';
import { Account } from '../models';

namespace AccountRepository {
  export const repository = sequelize.getRepository(Account);
}

export default AccountRepository;
