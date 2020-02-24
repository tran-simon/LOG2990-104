import { injectable } from 'inversify';
import { Message } from '../../../common/communication/message';

import { Collection, MongoClient, MongoClientOptions } from 'mongodb';

import { Drawing } from '../../models/drawing';

@injectable()
export class DatabaseService {

  static DATABASE_URL = 'mongodb+srv://polydessin:letmein1@cluster0-lgpty.azure.mongodb.net/test?retryWrites=true&w=majority';
  static DATABASE_NAME = 'polydessin';
  static DATABASE_COLLECTION = 'dessin';

  collection: Collection<Drawing>;

  private options: MongoClientOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  };

  constructor() {
    MongoClient.connect(DatabaseService.DATABASE_URL, this.options)
      .then((client: MongoClient) => {
        this.collection = client.db(DatabaseService.DATABASE_NAME).collection(DatabaseService.DATABASE_COLLECTION);
        console.log('Connected to MongoDB Cloud!');
      })
      .catch(() => {
        console.error('CONNECTION ERROR. EXITING PROCESS');
        process.exit(1);
      });
  }

  message(): Message {
    return { title: 'PolyDessin Database API', body: 'Welcome to the database API homepage.' };
  }

  async getAllDrawings(): Promise<Drawing[]> {
    return this.collection.find({}).toArray()
      .then((drawings: Drawing[]) => {
        return drawings;
      })
      .catch((error: Error) => {
        throw error;
      });
  }
}
