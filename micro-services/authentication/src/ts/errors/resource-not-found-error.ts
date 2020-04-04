export class ResourceNotFoundError extends Error {
  constructor(resourceName: string) {
    super(`No ${resourceName} found with provided params`);
  }
}
