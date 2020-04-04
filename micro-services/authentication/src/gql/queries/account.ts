import { GraphQLID, GraphQLNonNull, GraphQLFieldConfig } from 'graphql';
import Account from '../../gql/schemas/account';

const fetch = async () => {
  return {
    id: 1,
    email: 'thibault@nobbas.com',
  };
};

export const account: GraphQLFieldConfig<void, void> = {
  type: Account,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: fetch,
};
