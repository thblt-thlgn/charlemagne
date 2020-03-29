import { Account } from './account.schema';
import { GraphQLFieldConfig } from 'graphql';
import { GQLNonNullableList } from '@shared/utils';

const accountListResolver = async () => {
  return [
    {
      id: 1,
      email: 'thibault@nobbas.com',
    },
  ];
};

export const accountList: GraphQLFieldConfig<void, void> = {
  type: GQLNonNullableList(Account),
  resolve: accountListResolver,
};
