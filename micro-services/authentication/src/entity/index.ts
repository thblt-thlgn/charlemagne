import { loadResolvers, loadSchemas } from '@shared/utils';

export const typeDefs = loadSchemas();
export const resolvers = loadResolvers(__dirname);
