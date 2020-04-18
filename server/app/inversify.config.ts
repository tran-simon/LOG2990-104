import 'reflect-metadata';

import { Container } from 'inversify';
import Types from './types';

import { Application } from './app';
import { APIController } from './controllers/api.controller';
import { DatabaseController } from './controllers/database.controller';
import { EmailController } from './controllers/email.controller';
import { Server } from './server';
import { DatabaseService } from './services/database.service';
import { EmailService } from './services/email.service';

export const containerBootstrapper: () => Promise<Container> = async () => {
  const container: Container = new Container();

  container.bind(Types.Server).to(Server);
  container.bind(Types.Application).to(Application);
  container.bind(Types.APIController).to(APIController);
  container.bind(Types.EmailController).to(EmailController);
  container.bind(Types.EmailService).to(EmailService);
  container.bind(Types.DatabaseController).to(DatabaseController);
  container.bind(Types.DatabaseService).to(DatabaseService);

  return container;
};
