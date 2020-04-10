import { Conversation } from '@src/models';
import { Service } from 'typedi';
import { Resolver, Query, Arg } from 'type-graphql';
import { ConversationRepository } from '@src/repositories';

@Service()
@Resolver(Conversation)
export default class ConversationResolver {
  constructor(private readonly conversationRepo: ConversationRepository) {}

  @Query(() => Conversation)
  async conversation(@Arg('id') id: string): Promise<Conversation | null> {
    throw new Error('not found');
  }

  @Query(() => [Conversation])
  async conversationList(): Promise<Conversation[]> {
    return [];
  }
}
