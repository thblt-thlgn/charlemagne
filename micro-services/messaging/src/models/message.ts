import { Table, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { ObjectType, Field, ID } from 'type-graphql';
import Conversation from './conversation';

@Table({
  underscored: true,
  timestamps: true,
  paranoid: true,
})
@ObjectType()
export default class Message extends Model<Message> {
  @Field(() => ID)
  id: number;

  @Column
  @Field()
  author: number;

  @Column
  @Field()
  text: string;

  @ForeignKey(() => Conversation)
  @Column
  @Field(() => ID)
  conversationId: number;

  @BelongsTo(() => Conversation)
  @Field(() => Conversation)
  conversation: Conversation;
}
