import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
  ForeignKey,
  PrimaryKey,
} from 'sequelize-typescript';
import Account from '../account/model';

@Table({
  underscored: true,
  timestamps: true,
  paranoid: true,
})
export class RefreshToken extends Model<RefreshToken> {
  @PrimaryKey
  @Column
  id: string;

  @Column({ type: DataType.STRING, allowNull: true })
  os: string | null;

  @Column({ type: DataType.STRING, allowNull: true })
  browser: string | null;

  @Column({ type: DataType.STRING, allowNull: true })
  browserVersion: string | null;

  @Column({ type: DataType.STRING, allowNull: true })
  ip: string | null;

  @Column({ type: DataType.STRING, allowNull: true })
  location: string | null;

  @BelongsTo(() => Account)
  account: Account;

  @ForeignKey(() => Account)
  @Column
  accountId: number;

  @Column
  expiry: Date;

  @Column({
    type: DataType.VIRTUAL,
    get: () => 'RefreshToken',
  })
  // tslint:disable-next-line: variable-name
  _type: string;
}

export default RefreshToken;
