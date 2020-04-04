import 'source-map-support/register';
import './config/module-alias';
import ENVIRONMENT from './config/environment';
import { schema } from './gql';
import { express as userAgent } from 'express-useragent';
import { GraphQLServer } from 'graphql-yoga';

const server = new GraphQLServer({
  schema,
});

server
  .use(userAgent())
  .start({ port: ENVIRONMENT.SERVER_PORT }, () =>
    console.log(`The server is running on http://localhost:${ENVIRONMENT.SERVER_PORT}`),
  );
