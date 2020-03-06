import * as express from 'express';
import { inject, injectable } from 'inversify';
import { DatabaseService } from '../services/database.service';
import Types from '../types';

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

    this.router.get('/drawings', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
      this.databaseService.getAllDrawings(res);
    });

    this.router.get('/drawings/:id', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
      this.databaseService.getDrawingById(res, req.params.id);
    });

    this.router.post('/drawings', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
      this.databaseService.addDrawing(res, req.body);
    });

    this.router.delete('/drawings/:id', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
      this.databaseService.deleteDrawing(res, req.params.id);
    });

    this.router.post('/drawings/:id', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
      this.databaseService.updateDrawing(res, req.params.id, req.body);
    });
  }
}
