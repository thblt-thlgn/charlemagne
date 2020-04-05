import { Account } from '@src/models';
import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { AccountRepository } from '@src/repositories';
import { Service } from 'typedi';

@Service()
@Resolver(Account)
export default class AccountResolver {
  constructor(private readonly repo: AccountRepository) {}

  @Query(() => Account)
  async account(@Arg('id') id: number) {
    return this.repo.find({ where: { id } });
  }

  @Query(() => [Account])
  async accountList() {
    return this.repo.findAll();
  }

  // @Mutation(() => boolean)
  // async login() {
  //   return this.repo.login();
  // }

  // @Mutation(() => boolean)
  // async signup() {
  //   return this.repo.signup();
  // }
}
