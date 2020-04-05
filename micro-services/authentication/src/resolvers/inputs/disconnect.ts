import { InputType, Field } from 'type-graphql';

@InputType()
export default class DisconnectInput {
  @Field()
  id: string;

  @Field()
  accountId: number;
}
