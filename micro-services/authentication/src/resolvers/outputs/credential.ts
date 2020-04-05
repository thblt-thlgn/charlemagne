import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export default class CredentialOutput {
  @Field()
  jwt: string;

  @Field()
  refreshToken: string;
}
