import * as express from 'express';
import { DatabaseService } from '../services/database.service';

import { inject, injectable } from 'inversify';
import Types from '../types';

// import { Drawing } from '../../models/drawing';

import * as httpStatus from 'http-status-codes';

import 'reflect-metadata';

@injectable()
export class DatabaseController {

  router: express.Router;

  constructor(
    @inject(Types.DatabaseService) private databaseService: DatabaseService) {
    this.configureRouter();
  }

  private configureRouter(): void {
    this.router = express.Router();

    this.router.get('/', async (req: express.Request, res: express.Response) => {
      res.send(this.databaseService.message());
    });

    // this.router.get('/drawings', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    //   this.databaseService.getAllDrawings()
    //     .then((drawings: Drawing[]) => {
    //       res.json(drawings);
    //     })
    //     .catch((error: Error) => {
    //       res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    //     });
    // });

    this.router.post('/drawings', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
      this.databaseService.addDrawing(req.body).then(() => {
        res.sendStatus(httpStatus.OK).send();
      })
        .catch((error: Error) => {
          res.status(httpStatus.BAD_REQUEST).send(error.message);
        });
    });
  }
}
