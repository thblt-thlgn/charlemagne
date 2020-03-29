import { Account } from './schema';
import { GraphQLFieldConfig, GraphQLList, GraphQLNonNull } from 'graphql';

const accountListResolver = async () => {
  return [
    {
      id: 1,
      email: 'thibault@nobbas.com',
    },
  ];
};

export const accountList: GraphQLFieldConfig<void, void> = {
  type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Account))),
  resolve: accountListResolver,
};
