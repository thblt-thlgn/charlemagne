import { Message } from '@src/models';
import { Service } from 'typedi';
import { Resolver, Query, Arg } from 'type-graphql';
import { MessageRepository } from '@src/repositories';

@Service()
@Resolver(Message)
export default class MessageResolver {
  constructor(private readonly messageRepo: MessageRepository) {}

  @Query(() => [Message])
  async messageList(@Arg('conversationId') conversationId: string): Promise<Message[]> {
    return [];
  }
}
