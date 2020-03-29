import { fileLoader } from 'merge-graphql-schemas';
import * as path from 'path';

export const loadResolvers = (dirname: string) => {
  const resolverList = fileLoader(path.join(dirname, './**/*.resolver.js'));
  const resolvers = resolverList.reduce((acc, func) => ({ ...acc, [func.name]: func }), {});

  return {
    Query: {
      ...resolvers,
    },
  };
};
