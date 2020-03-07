import * as express from 'express';
import { inject, injectable } from 'inversify';

import { APIService } from '../services/api.service';
import Types from '../types';
import { DatabaseController } from './database.controller';

@injectable()
export class APIController {
  app: express.Application;
  router: express.Router;

  constructor(
    @inject(Types.APIService) private apiService: APIService,
    @inject(Types.DatabaseController) private databaseController: DatabaseController,
  ) {
    this.app = express();

    this.configureRouter();
  }

  private configureRouter(): void {
    this.router = express.Router();

    this.router.use('/database', this.databaseController.router);

    this.router.get('/', async (req: express.Request, res: express.Response) => {
      res.send(this.apiService.message());
    });
  }
}
