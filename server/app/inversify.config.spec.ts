import { expect } from 'chai';
import { container } from './inversify.config';

import Types from './types';

import { Application } from './app';
import { IndexController } from './controllers/index.controller';
import { Server } from './server';
import { IndexService } from './services/index.service';

describe('Inversify config', () => {

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

    it('should have IndexController binded to Types.IndexController', (done: Mocha.Done) => {
        const indexController = container.get<IndexController>(Types.IndexController);
        expect(indexController).to.be.instanceOf(IndexController);
        done();
    });

    it('should have IndexService binded to Types.IndexService', (done: Mocha.Done) => {
        const indexService = container.get<IndexService>(Types.IndexService);
        expect(indexService).to.be.instanceOf(IndexService);
        done();
    });
});
