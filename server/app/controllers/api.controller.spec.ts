/* tslint:disable:no-require-imports no-var-requires*/
import * as chai from 'chai';
import 'chai-http';
chai.use(require('chai-http'));

import { APIController } from './api.controller';

import { testingContainer } from '../../test/test-utils';
import Types from '../types';

describe('API Controller', () => {
  let apiController: APIController;

  beforeEach(async () => {
    await testingContainer().then((instance) => {
      apiController = instance[0].get<APIController>(Types.APIController);
    });
  });

  it('should instanciate correctly', (done: Mocha.Done) => {
    chai.expect(apiController).to.be.instanceOf(APIController);
    done();
  });
});
