import { Container } from 'inversify';
import Types from './types';

import { Server } from './server';
import { Application } from './app';
import { IndexController } from './controllers/index.controller';
import { IndexService } from './services/index.service';

const container: Container = new Container();

container.bind(Types.Server).to(Server);
container.bind(Types.Application).to(Application);
container.bind(Types.IndexController).to(IndexController);
container.bind(Types.IndexService).to(IndexService);

export { container };
