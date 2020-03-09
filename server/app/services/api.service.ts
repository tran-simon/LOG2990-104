import { injectable } from 'inversify';
import { Message } from '../../../common/communication/message';

import 'reflect-metadata';

@injectable()
export class APIService {
  message(): Message {
    return { title: 'PolyDessin API', body: 'Welcome to the API homepage.' };
  }
}
