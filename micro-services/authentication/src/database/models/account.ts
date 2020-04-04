import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { ACCOUNT_ROLE } from '@shared/ts';
import RefreshToken from './refresh-token';

@Table({
  underscored: true,
  timestamps: true,
  paranoid: true,
})
class Account extends Model<Account> {
  @Column({
    unique: true,
    validate: {
      isEmail: true,
    },
    set(val: string) {
      this.setDataValue('email', val.toLowerCase());
    },
  })
  email: string;

  @Column({ allowNull: true })
  hash: string;

  @Column({ allowNull: true })
  salt: string;

  @Column({
    type: DataType.ARRAY(DataType.ENUM(...Object.values(ACCOUNT_ROLE))),
  })
  role: ACCOUNT_ROLE[];

  @Column
  verifiedAt: Date;

  @HasMany(() => RefreshToken)
  refreshTokens: RefreshToken[];
}

export default Account;
