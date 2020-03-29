import { GraphQLObjectType, GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql';

const Account = new GraphQLObjectType({
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

export default Account;
