import * as express from 'express';
import { inject, injectable } from 'inversify';

import Types from '../types';
import { DatabaseController } from './database.controller';
import { EmailController } from './email.controller';

@injectable()
export class APIController {
  app: express.Application;
  router: express.Router;

  // tslint:disable-next-line: max-line-length
  constructor(@inject(Types.DatabaseController) private databaseController: DatabaseController, @inject(Types.EmailController) private emailController: EmailController) {
    this.app = express();

    this.configureRouter();
  }

  private configureRouter(): void {
    this.router = express.Router();

    this.router.use('/database', this.databaseController.router);
    this.router.use('/email', this.emailController.router);
  }
}
