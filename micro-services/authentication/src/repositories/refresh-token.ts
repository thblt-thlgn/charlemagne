import { sequelize } from '@src/config/database';
import { RefreshToken } from '../models';

namespace RefreshTokenRepository {
  export const repository = sequelize.getRepository(RefreshToken);
}

export default RefreshTokenRepository;
