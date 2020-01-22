import { injectable } from 'inversify';
import 'reflect-metadata';
import { Message } from '../../../common/communication/message';

@injectable()
export class IndexService {
    about(): Message {
        return {
            title: 'This is merely a test',
            body: 'Lorem ipsum........',
        };
    }
}
