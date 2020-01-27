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

    indexMessage(): Message {
        return { title: 'Index page', body: 'You have reached the index page.' };
    }
}
