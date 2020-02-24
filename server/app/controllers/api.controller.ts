import { Response, Router } from 'express';
import { inject, injectable } from 'inversify';

import { APIService } from '../services/api.service';
import Types from '../types';

@injectable()
export class APIController {
  router: Router;

  constructor(@inject(Types.APIService) private apiService: APIService) {
    this.configureRouter();
  }

  private configureRouter(): void {
    this.router = Router();

    this.router.get('/', async (res: Response) => {
      // Send the request to the service and send the response
      res.send(this.apiService.message());
    });
  }
}
