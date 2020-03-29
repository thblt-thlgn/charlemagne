import { GraphQLObjectType, GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql';

export const Account = new GraphQLObjectType({
  name: 'Account',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
  }),
});
