import { Container } from 'inversify';
import 'reflect-metadata';
import { DEV_PORT, PROD_PORT } from './constants';
import { containerBootstrapper } from './inversify.config';
import { Server } from './server';
import Types from './types';

void (async () => {
  const container: Container = await containerBootstrapper();
  const server: Server = container.get<Server>(Types.Server);

  process.env.USER === 'root' ?
    server.init(PROD_PORT) :
    server.init(DEV_PORT);
})();
