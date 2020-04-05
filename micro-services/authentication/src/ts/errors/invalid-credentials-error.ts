import { UserInputError } from 'apollo-server';

export class InvalidCredentialsError extends UserInputError {
  constructor() {
    super('Invalid credentials');
  }
}
