import { injectable } from 'inversify';
import 'reflect-metadata';
import { Message } from '../../../common/communication/message';

@injectable()
export class APIService {
  message(): Message {
    return { title: 'PolyDessin API', body: 'Welcome to the API homepage.' };
  }
}
