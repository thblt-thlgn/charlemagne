import { Resolver, Query, Mutation, Arg, Ctx } from 'type-graphql';
import { AccountRepository, RefreshTokenRepository } from '@src/repositories';
import { Service } from 'typedi';
import { Context } from '@src/ts';
import { Account } from '@src/models';
import { sequelize } from '@src/config/database';
import { jwtManager } from '@src/config/jwt-manager';
import { CredentialInput } from './inputs';
import { CredentialOutput } from './outputs';

@Service()
@Resolver(Account)
export default class AccountResolver {
  constructor(
    private readonly accountRepo: AccountRepository,
    private readonly refreshTokenRepo: RefreshTokenRepository,
  ) {}

  @Query(() => Account)
  async account(@Arg('id') id: number): Promise<Account> {
    return this.accountRepo.find({ where: { id } });
  }

  @Query(() => [Account])
  async accountList(): Promise<Account[]> {
    return this.accountRepo.findAll();
  }

  @Mutation(() => CredentialOutput)
  async login(
    @Arg('credentials') credentials: CredentialInput,
    @Ctx() ctx: Context,
  ): Promise<CredentialOutput> {
    const { requestData } = ctx;

    return sequelize.transaction(async (trx) => {
      const account = await this.accountRepo.login(credentials, trx);
      const { id: refreshToken } = await this.refreshTokenRepo.create(account, requestData, trx);
      const jwt = jwtManager.sign(account);

      return { jwt, refreshToken };
    });
  }

  @Mutation(() => CredentialOutput)
  async signup(
    @Arg('credentials') credentials: CredentialInput,
    @Ctx() ctx: Context,
  ): Promise<CredentialOutput> {
    const { requestData } = ctx;

    return sequelize.transaction(async (trx) => {
      const account = await this.accountRepo.signup(credentials, trx);
      const jwt = jwtManager.sign(account);
      const { id: refreshToken } = await this.refreshTokenRepo.create(account, requestData, trx);

      return { jwt, refreshToken };
    });
  }
}
