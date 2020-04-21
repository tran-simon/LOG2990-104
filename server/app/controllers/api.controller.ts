import * as express from 'express';
import { inject, injectable } from 'inversify';

import Types from '../types';
import { DatabaseController } from './database.controller';

@injectable()
export class APIController {
  router: express.Router;

  constructor(@inject(Types.DatabaseController) private databaseController: DatabaseController) {
    this.configureRouter();
  }

  private configureRouter(): void {
    this.router = express.Router();

    this.router.use('/database', this.databaseController.router);
  }
}
