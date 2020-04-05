import { GraphQLServer } from 'graphql-yoga';
import { buildSchemaSync } from 'type-graphql';
import { express as userAgent } from 'express-useragent';
import { Container } from 'typedi';
import ENVIRONMENT from './environment';
import * as resolvers from '@src/resolvers';
import { extractRequestData } from '@src/utils/extract-request-data';
import { Context } from '@src/ts';
import { ApolloError } from 'apollo-server';

const schema = buildSchemaSync({
  resolvers: Object.values(resolvers),
  container: Container,
});

const server = new GraphQLServer({
  schema,
  context: ({ request }): Context => ({
    requestData: extractRequestData(request),
  }),
});

server.use(userAgent()).start(
  {
    port: ENVIRONMENT.SERVER_PORT,
    formatError: (err: ApolloError) => err,
  },
  () => console.log(`The server is running on http://localhost:${ENVIRONMENT.SERVER_PORT}`),
);
