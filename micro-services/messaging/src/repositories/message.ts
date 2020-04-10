import { Service } from 'typedi';
import { Message } from '@src/models';
import db from '@src/config/database';

@Service()
export default class MessageRepository {
  private repository = db.getRepository(Message);
}
