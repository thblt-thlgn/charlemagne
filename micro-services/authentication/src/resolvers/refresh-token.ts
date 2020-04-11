import { RefreshToken } from '@src/models';
import { Service } from 'typedi';
import { Resolver, Mutation, Arg, Query, Ctx } from 'type-graphql';
import { RefreshTokenRepository, AccountRepository } from '@src/repositories';
import db from '@src/config/database';
import jwtManager from '@src/config/jwt-manager';
import { Context } from '@src/ts';
import { DisconnectInput, RefreshInput } from './inputs';
import { CredentialOutput } from './outputs';

@Service()
@Resolver(RefreshToken)
export default class RefreshTokenResolver {
  constructor(
    private readonly refreshTokenRepo: RefreshTokenRepository,
    private readonly accountRepo: AccountRepository,
  ) {}

  @Query(() => RefreshToken)
  async refreshToken(@Arg('id') id: string): Promise<RefreshToken> {
    return this.refreshTokenRepo.find({ where: { id } });
  }

  @Query(() => [RefreshToken])
  async refreshTokenList(
    @Arg('accountId', { nullable: true }) accountId?: number,
  ): Promise<RefreshToken[]> {
    const opts = accountId ? { where: { accountId } } : {};
    return this.refreshTokenRepo.findAll(opts);
  }

  @Mutation(() => Boolean)
  async disconnect(@Arg('params') params: DisconnectInput, @Ctx() ctx: Context) {
    // TODO: check if jwt token has autorizations
    await this.refreshTokenRepo.remove(params.id, params.accountId);
    ctx.setCookies('jwt', null);
    ctx.setCookies('refreshToken', null);
    return true;
  }

  @Mutation(() => CredentialOutput)
  async refresh(
    @Arg('params') params: RefreshInput,
    @Ctx() ctx: Context,
  ): Promise<CredentialOutput> {
    const { requestData, setCookies } = ctx;
    const { refreshToken, accountId } = params;

    return db.transaction(async (trx) => {
      const { id } = await this.refreshTokenRepo.refresh(refreshToken, accountId, requestData, trx);
      const account = await this.accountRepo.find({ id: accountId }, trx);
      const jwt = jwtManager.sign(account);
      setCookies('jwt', jwt);
      setCookies('refreshToken', id);

      return { jwt, refreshToken: id };
    });
  }
}
