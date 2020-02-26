import { Container } from 'inversify';
import Types from './types';

import { Application } from './app';
import { APIController } from './controllers/api.controller';
import { Server } from './server';
import { APIService } from './services/api.service';

const container: Container = new Container();

container.bind(Types.Server).to(Server);
container.bind(Types.Application).to(Application);
container.bind(Types.APIController).to(APIController);
container.bind(Types.APIService).to(APIService);

export { container };
