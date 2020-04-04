import { GraphQLFieldConfig } from 'graphql';
import { GQLNonNullableList } from '@shared/utils';
import Account from '../../gql/schemas/account';

const fetchList = async () => {
  return [
    {
      id: 1,
      email: 'thibault@nobbas.com',
    },
  ];
};

export const accountList: GraphQLFieldConfig<void, void> = {
  type: GQLNonNullableList(Account),
  resolve: fetchList,
};
