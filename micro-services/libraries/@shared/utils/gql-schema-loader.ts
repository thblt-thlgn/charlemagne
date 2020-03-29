import { fileLoader } from 'merge-graphql-schemas';
import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import * as path from 'path';

export const GQLSchemaLoader = (dirname: string) => {
  const resolverList = fileLoader(path.join(dirname, './**/*.resolver.js'));
  const resolvers = resolverList.reduce((acc, resolver) => ({ ...acc, ...resolver }), {});

  const Query = new GraphQLObjectType({
    name: 'Query',
    fields: () => resolvers,
  });

  return new GraphQLSchema({
    query: Query,
  });
};
