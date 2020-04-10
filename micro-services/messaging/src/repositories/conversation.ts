import { Service } from 'typedi';
import { Conversation } from '@src/models';
import db from '@src/config/database';

@Service()
export default class ConversationRepository {
  private repository = db.getRepository(Conversation);
}
