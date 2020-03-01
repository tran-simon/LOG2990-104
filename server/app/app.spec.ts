/* tslint:disable:no-require-imports no-var-requires no-magic-numbers no-any */
import * as chai from 'chai';
import 'chai-http';
chai.use(require('chai-http'));

import * as sinon from 'sinon';

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

  it('should setup error handling after binding routes', (done: Mocha.Done) => {
    const spy = sinon.spy(application, 'errorHandling' as any);

    application.bindRoutes();

    chai.expect(spy.called).to.be.equal(true);
    done();
  });

  it('should provoke an error when accessing an unknown path in the dev environment', (done: Mocha.Done) => {
    chai.request(application.app).get('/').then((res) => {
      chai.expect(res.status).to.equal(500);
      done();
    });
  });
});
