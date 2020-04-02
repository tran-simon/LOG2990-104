/* tslint:disable:no-require-imports no-var-requires*/
/* tslint:disable:no-string-literal*/
import * as chai from 'chai';
import 'chai-http';
import * as sinon from 'sinon';
chai.use(require('chai-http'));

import { testingContainer } from '../../test/test-utils';
import { Application } from '../app';

import { DatabaseService } from '../services/database.service';
import Types from '../types';
import { DatabaseController } from './database.controller';

describe('Database Controller', () => {
  let application: Application;
  let databaseController: DatabaseController;

  beforeEach(async () => {
    await testingContainer().then((instance) => {
      application = instance[0].get<Application>(Types.Application);
      databaseController = instance[0].get<DatabaseController>(Types.DatabaseController);
    });
  });

  it('should instanciate correctly', (done: Mocha.Done) => {
    chai.expect(databaseController).to.be.instanceOf(DatabaseController);
    done();
  });

  it('should call getAllDrawings when accessing api/database/drawings', (done: Mocha.Done) => {
    const stub = sinon.stub(DatabaseService.prototype, 'getAllDrawings').resolves({ statusCode: 200, documents: [] });
    chai.request(application.app).get('/api/database/drawings').then((res) => {
      chai.expect(stub.calledOnce).to.equal(true);
      stub.restore();
      done();
    });
  });
});
