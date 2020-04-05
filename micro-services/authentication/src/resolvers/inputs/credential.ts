import { InputType, Field } from 'type-graphql';
import { Credential } from '@src/ts';

@InputType()
export default class CredentialInput implements Credential {
  @Field()
  email: string;

  @Field()
  password: string;
}
