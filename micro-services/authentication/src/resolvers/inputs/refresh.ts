import { InputType, Field } from 'type-graphql';

@InputType()
export default class RefreshInput {
  @Field()
  refreshToken: string;

  @Field()
  accountId: number;
}
