import { fileLoader } from 'merge-graphql-schemas';
import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import * as path from 'path';

const loadQueries = (dirname: string): GraphQLObjectType => {
  const queryList = fileLoader(path.join(dirname, './queries/*.js'));
  const queries = queryList.reduce((acc, query) => ({ ...acc, ...query }), {});

  return new GraphQLObjectType({
    name: 'Query',
    fields: () => queries,
  });
};

const loadMutations = (dirname: string): GraphQLObjectType => {
  const mutationList = fileLoader(path.join(dirname, './mutations/*.js'));
  const mutations = mutationList.reduce((acc, mutation) => ({ ...acc, ...mutation }), {});

  return new GraphQLObjectType({
    name: 'Mutation',
    fields: () => mutations,
  });
};

export const GQLSchemaLoader = (dirname: string) =>
  new GraphQLSchema({
    query: loadQueries(dirname),
    // mutation: loadMutations(dirname),
  });
