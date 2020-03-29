import { fileLoader } from 'merge-graphql-schemas';
import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import * as path from 'path';

const loadQueries = (dirname: string): GraphQLObjectType => {
  const resolverList = fileLoader(path.join(dirname, './**/*.resolver.js'));
  const resolvers = resolverList.reduce((acc, resolver) => ({ ...acc, ...resolver }), {});

  return new GraphQLObjectType({
    name: 'Query',
    fields: () => resolvers,
  });
};

const loadMutations = (dirname: string): GraphQLObjectType => {
  const mutationList = fileLoader(path.join(dirname, './**/*.mutation.js'));
  const mutations = mutationList.reduce((acc, mutation) => ({ ...acc, ...mutation }), {});

  return new GraphQLObjectType({
    name: 'Mutation',
    fields: () => mutations,
  });
};

export const GQLSchemaLoader = (dirname: string) =>
  new GraphQLSchema({
    query: loadQueries(dirname),
    mutation: loadMutations(dirname),
  });
