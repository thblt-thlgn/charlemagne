import { Resolver, Query, Mutation, Arg, Ctx } from 'type-graphql';
import { AccountRepository, RefreshTokenRepository } from '@src/repositories';
import { Service } from 'typedi';
import { Context } from '@src/ts';
import { Account } from '@src/models';
import { CredentialInput } from './inputs';
import { CredentialOutput } from './outputs';
import db from '@src/config/database';
import jwtManager from '@src/config/jwt-manager';

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
    const { requestData, setCookies } = ctx;

    return db.transaction(async (trx) => {
      const account = await this.accountRepo.login(credentials, trx);
      const { id: refreshToken } = await this.refreshTokenRepo.create(account, requestData, trx);
      const jwt = jwtManager.sign(account);

      setCookies('jwt', jwt);
      setCookies('refreshToken', refreshToken);
      return { jwt, refreshToken };
    });
  }

  @Mutation(() => CredentialOutput)
  async signup(
    @Arg('credentials') credentials: CredentialInput,
    @Ctx() ctx: Context,
  ): Promise<CredentialOutput> {
    const { requestData, setCookies } = ctx;

    return db.transaction(async (trx) => {
      const account = await this.accountRepo.signup(credentials, trx);
      const jwt = jwtManager.sign(account);
      const { id: refreshToken } = await this.refreshTokenRepo.create(account, requestData, trx);

      setCookies('jwt', jwt);
      setCookies('refreshToken', refreshToken);
      return { jwt, refreshToken };
    });
  }
}
