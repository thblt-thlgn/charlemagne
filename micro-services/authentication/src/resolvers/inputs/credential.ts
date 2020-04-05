import { InputType, Field } from 'type-graphql';

@InputType()
export default class CredentialInput {
  @Field()
  email: string;

  @Field()
  password: string;
}
