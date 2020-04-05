import { GraphQLServer } from 'graphql-yoga';
import { buildSchemaSync } from 'type-graphql';
import { express as userAgent } from 'express-useragent';
import ENVIRONMENT from './environment';
import AccountResolver from '@src/resolvers/account';
import { Container } from 'typedi';

const schema = buildSchemaSync({
  resolvers: [AccountResolver],
  container: Container,
});

const server = new GraphQLServer({
  schema,
});

server
  .use(userAgent())
  .start({ port: ENVIRONMENT.SERVER_PORT }, () =>
    console.log(`The server is running on http://localhost:${ENVIRONMENT.SERVER_PORT}`),
  );
