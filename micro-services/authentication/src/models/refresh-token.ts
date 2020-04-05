import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
  ForeignKey,
  PrimaryKey,
} from 'sequelize-typescript';
import Account from './account';
import { RequestData } from '@src/ts';
import { Field, ID, ObjectType } from 'type-graphql';

@Table({
  underscored: true,
  timestamps: true,
  paranoid: true,
})
@ObjectType()
export default class RefreshToken extends Model<RefreshToken> implements RequestData {
  @PrimaryKey
  @Column
  @Field()
  id: string;

  @Column({ type: DataType.STRING, allowNull: true })
  @Field(() => String, { nullable: true })
  os: string | null;

  @Column({ type: DataType.STRING, allowNull: true })
  @Field(() => String, { nullable: true })
  browser: string | null;

  @Column({ type: DataType.STRING, allowNull: true })
  @Field(() => String, { nullable: true })
  browserVersion: string | null;

  @Column({ type: DataType.STRING, allowNull: true })
  @Field(() => String, { nullable: true })
  ip: string | null;

  @Column({ type: DataType.STRING, allowNull: true })
  @Field(() => String, { nullable: true })
  location: string | null;

  @BelongsTo(() => Account)
  account: Account;

  @ForeignKey(() => Account)
  @Column
  @Field(() => ID)
  accountId: number;

  @Column
  @Field()
  expiry: Date;
}
