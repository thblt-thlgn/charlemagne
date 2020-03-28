import { isNullOrUndefined, isArray } from 'util';

class UnsetEnvironmentVariableError extends Error {
  constructor(variableName: string) {
    super(`${variableName} environment variable is missing`);
  }
}

export const extractEnvironmentVariable = <T extends string | number | boolean = string>(
  key: string | string[],
  type: 'string' | 'integer' | 'float' | 'boolean' = 'string',
): T => {
  const value = isArray(key)
    ? key.reduce(
        (acc: string | undefined, cursor): string | undefined => acc || process.env[cursor],
        undefined,
      )
    : process.env[key];

  if (isNullOrUndefined(value)) {
    throw new UnsetEnvironmentVariableError(isArray(key) ? key.join(', ') : key);
  }

  switch (type) {
    case 'integer':
      return parseInt(value, 10) as T;
    case 'float':
      return parseFloat(value) as T;
    case 'boolean':
      return (value === 'true') as T;
    default:
      return value as T;
  }
};
