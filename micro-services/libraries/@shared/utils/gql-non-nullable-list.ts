import { GraphQLType, GraphQLList, GraphQLNonNull } from 'graphql';

export const GQLNonNullableList = (node: GraphQLType) =>
  new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(node)));
