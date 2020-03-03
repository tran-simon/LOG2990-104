/* tslint:disable:no-require-imports no-var-requires*/
import * as chai from 'chai';
import 'chai-http';
chai.use(require('chai-http'));

import * as httpStatus from 'http-status-codes';

import { container } from './inversify.config';
import Types from './types';

import { Application } from './app';

let application: Application;

describe('Application', () => {
  beforeEach(() => {
    application = container.get<Application>(Types.Application);
  });

  it('should instanciate as the correct type', (done: Mocha.Done) => {
    chai.expect(application).to.be.instanceOf(Application);
    done();
  });

  it('should provoke an error when accessing an unknown path in the dev environment', (done: Mocha.Done) => {
    chai.request(application.app).get('/').then((res) => {
      chai.expect(res.status).to.equal(httpStatus.INTERNAL_SERVER_ERROR);
      done()
    });
  });
});
