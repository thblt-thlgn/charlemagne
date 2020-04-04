import { Account } from '@src/models';
import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { AccountRepository } from '@src/repositories';

@Resolver(Account)
export default class AccountResolver {
  @Query(() => Account)
  async account(@Arg('id') id: number) {
    return {};
    // return AccountRepository.find({ where: { id } });
  }
  // @Query(() => [Account])
  // async accountList() {
  //   return AccountRepository.repository.findAll();
  // }
  // @Mutation(() => boolean)
  // async login() {
  //   return AccountRepository.login();
  // }
  // @Mutation(() => boolean)
  // async signup() {
  //   return AccountRepository.signup();
  // }
}
