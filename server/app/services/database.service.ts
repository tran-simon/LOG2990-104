import { injectable } from 'inversify';
import { Message } from '../../../common/communication/message';

import { Drawing } from '../../models/drawing';

import 'reflect-metadata';

@injectable()
export class DatabaseService {

  static DATABASE_URL = 'mongodb+srv://polydessin:letmein1@cluster0-lgpty.azure.mongodb.net/test?retryWrites=true&w=majority';
  static DATABASE_NAME = 'polydessin';
  static DATABASE_COLLECTION = 'dessin';

  //constructor() {
  //}

  message(): Message {
    return { title: 'PolyDessin Database API', body: 'Welcome to the database API homepage.' };
  }

  // async getAllDrawings(): Promise<Drawing[]> {
  // }

  // async addDrawing(drawing: Drawing): Promise<void> {
  // }

  // validateDrawing(drawing: Drawing): boolean {
  //  return true;
  // }
}
