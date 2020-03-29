import { GraphQLID, GraphQLNonNull, GraphQLFieldConfig } from 'graphql';
import { GQLNonNullableList } from '@shared/utils';
import Account from './schema';
import fetch from './fetch';
import fetchList from './fetch-list';

export const accountList: GraphQLFieldConfig<void, void> = {
  type: GQLNonNullableList(Account),
  resolve: fetchList,
};

export const account: GraphQLFieldConfig<void, void> = {
  type: Account,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: fetch,
};
