/* tslint:disable:no-require-imports no-var-requires*/
import * as chai from 'chai';
import 'chai-http';
chai.use(require('chai-http'));

import * as httpStatus from 'http-status-codes';

import { Application } from '../app';

import { Container } from 'inversify';
import { containerBootstrapper } from '../inversify.config';
import Types from '../types';

describe('API Controller', () => {
  let container: Container;
  let application: Application;

  containerBootstrapper().then((c) => {
    container = c;
  });

  beforeEach(() => {
    application = container.get<Application>(Types.Application);
  });

  it('should OK on GET /', (done: Mocha.Done) => {
    chai.request(application.app).get('/api').then((res) => {
      chai.expect(res.status).to.equal(httpStatus.OK);
      done();
    });
  });
});
