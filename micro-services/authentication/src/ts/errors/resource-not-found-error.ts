import { UserInputError } from 'apollo-server';

export class ResourceNotFoundError extends UserInputError {
  constructor(resourceName: string) {
    super(`No ${resourceName} found with provided params`);
  }
}
