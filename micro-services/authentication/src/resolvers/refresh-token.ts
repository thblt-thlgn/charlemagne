import { RefreshToken } from '@src/models';
import { Service } from 'typedi';
import { Resolver, Mutation, Arg, Field, InputType, Query, Ctx } from 'type-graphql';
import { RefreshTokenRepository, AccountRepository } from '@src/repositories';
import { sequelize } from '@src/config/database';
import { jwtManager } from '@src/config/jwt-manager';
import { Context } from 'graphql-yoga/dist/types';

@InputType()
class DisconnectInput {
  @Field()
  id: string;

  @Field()
  accountId: number;
}

@InputType()
class RefreshInput {
  @Field()
  refreshToken: string;

  @Field()
  accountId: number;
}

@Service()
@Resolver(RefreshToken)
export default class RefreshTokenResolver {
  constructor(
    private readonly refreshTokenRepo: RefreshTokenRepository,
    private readonly accountRepo: AccountRepository,
  ) {}

  @Query(() => RefreshToken)
  async refreshToken(@Arg('id') id: string) {
    return this.refreshTokenRepo.find({ where: { id } });
  }

  @Query(() => [RefreshToken])
  async refreshTokenList(@Arg('accoundId', { nullable: true }) accountId?: number) {
    const opts = accountId ? { where: { accountId } } : {};
    return this.refreshTokenRepo.findAll(opts);
  }

  @Mutation(() => Boolean)
  async disconnect(@Arg('params') params: DisconnectInput) {
    // TODO: check if jwt token has autorizations
    return this.refreshTokenRepo.remove(params.id, params.accountId);
  }

  @Mutation(() => Boolean)
  async refresh(@Arg('params') params: RefreshInput, @Ctx() ctx: Context) {
    const { requestData } = ctx;
    const { refreshToken, accountId } = params;

    return sequelize.transaction(async (trx) => {
      const { id } = await this.refreshTokenRepo.refresh(refreshToken, accountId, requestData, trx);
      const account = await this.accountRepo.find({ id: accountId }, trx);
      const jwt = jwtManager.sign(account);

      return { jwt, refreshToken: id };
    });
  }
}
