import { expect } from 'chai';

import { Container } from 'inversify';
import { containerBootstrapper } from './inversify.config';
import Types from './types';

import { Application } from './app';
import { APIController } from './controllers/api.controller';
import { DatabaseController } from './controllers/database.controller';
import { Server } from './server';
import { APIService } from './services/api.service';
import { DatabaseService } from './services/database.service';

describe('Inversify config', () => {
  let container: Container;

  containerBootstrapper().then((c) => {
    container = c;
  });

  it('should have Server binded to Types.Server', (done: Mocha.Done) => {
    const server = container.get<Server>(Types.Server);
    expect(server).to.be.instanceOf(Server);
    done();
  });

  it('should have Application binded to Types.Application', (done: Mocha.Done) => {
    const application = container.get<Application>(Types.Application);
    expect(application).to.be.instanceOf(Application);
    done();
  });

  it('should have APIController binded to Types.APIController', (done: Mocha.Done) => {
    const apiController = container.get<APIController>(Types.APIController);
    expect(apiController).to.be.instanceOf(APIController);
    done();
  });

  it('should have APIService binded to Types.APIService', (done: Mocha.Done) => {
    const apiService = container.get<APIService>(Types.APIService);
    expect(apiService).to.be.instanceOf(APIService);
    done();
  });

  it('should have DatabaseService binded to Types.DatabaseService', (done: Mocha.Done) => {
    const databaseService = container.get<DatabaseService>(Types.DatabaseService);
    expect(databaseService).to.be.instanceOf(DatabaseService);
    done();
  });

  it('should have DatabaseController binded to Types.DatabaseController', (done: Mocha.Done) => {
    const databaseController = container.get<DatabaseController>(Types.DatabaseController);
    expect(databaseController).to.be.instanceOf(DatabaseController);
    done();
  });
});
