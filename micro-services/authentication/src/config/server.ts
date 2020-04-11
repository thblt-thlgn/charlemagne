import { GraphQLServer } from 'graphql-yoga';
import { buildSchemaSync } from 'type-graphql';
import { express as userAgent } from 'express-useragent';
import { Container } from 'typedi';
import ENVIRONMENT from './environment';
import * as resolvers from '@src/resolvers';
import { extractRequestData } from '@src/utils/extract-request-data';
import { Context } from '@src/ts';
import { ApolloError } from 'apollo-server';
import { add } from 'date-fns';

const schema = buildSchemaSync({
  resolvers: Object.values(resolvers),
  container: Container,
});

const server = new GraphQLServer({
  schema,
  context: ({ request, response }): Context => ({
    requestData: extractRequestData(request),
    setCookies: (key, value) => {
      const cookiesParams = {
        secure: ENVIRONMENT.HTTPS_ENABLED,
        path: '/',
        domain: ENVIRONMENT.HOSTNAME,
        expires: add(new Date(), { weeks: 1 }),
        sameSite: true,
      };

      response.cookie(key, value, cookiesParams);
    },
  }),
});

server.use(userAgent()).start(
  {
    port: ENVIRONMENT.PORT,
    formatError: (err: ApolloError) => err,
  },
  () => console.log(`The server is running on http://localhost:${ENVIRONMENT.PORT}`),
);
