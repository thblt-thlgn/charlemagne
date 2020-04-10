import { Table, Column, Model, HasMany, DataType } from 'sequelize-typescript';
import { ObjectType, Field, ID, Int } from 'type-graphql';
import Message from './message';

@Table({
  underscored: true,
  timestamps: true,
  paranoid: true,
})
@ObjectType()
export default class Conversation extends Model<Conversation> {
  @Field(() => ID)
  id: number;

  @Column
  @Field()
  name: string;

  @Column(DataType.ARRAY(DataType.NUMBER))
  @Field(() => [Int])
  accounts: Set<number>;

  @Column
  @Field()
  creator: number;

  @HasMany(() => Message)
  @Field(() => Message)
  messages: Message[];
}
