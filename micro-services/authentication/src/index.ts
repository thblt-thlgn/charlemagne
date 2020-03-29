import 'source-map-support/register';
import './config/module-alias';
import ENVIRONMENT from './config/environment';

import { GraphQLServer } from 'graphql-yoga';
import { typeDefs, resolvers } from './entity';

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start({ port: ENVIRONMENT.SERVER_PORT }, () =>
  console.log(`The server is running on http://localhost:${ENVIRONMENT.SERVER_PORT}`),
);
