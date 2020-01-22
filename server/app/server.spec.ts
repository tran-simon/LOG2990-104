import { expect } from 'chai';
import * as sinon from 'sinon';

import { Server } from './server';
import { Application } from './app';
import { IndexController } from './controllers/index.controller';
import { IndexService } from './services/index.service';

import { DEFAULT_PORT } from './constants';

describe('Server', () => {

    let server: Server;
    let anotherServer: Server;
    let app: Application;
    let indexController: IndexController;
    let indexService: IndexService;

    beforeEach(() => {
        indexService = new IndexService();
        indexController = new IndexController(indexService);
        app = new Application(indexController);

        server = new Server(app);
        anotherServer = new Server(app);
    });

    it('should init with an int port parameter', (done: Mocha.Done) => {
        var stub = sinon.stub(server, <any>'onListening');

        server.init(DEFAULT_PORT);

        setTimeout(() => {
            server.close();

            expect(stub.called).to.equal(true);
            stub.restore();
            done();
        })
    });

    it('should init with a string port parameter', (done: Mocha.Done) => {
        var stub = sinon.stub(server, <any>'onListening');

        server.init(DEFAULT_PORT.toString());

        setTimeout(() => {
            server.close();

            expect(stub.called).to.equal(true);
            stub.restore();
            done();
        })
    });

    it('should init with a string pipe name', (done: Mocha.Done) => {
        var stub = sinon.stub(server, <any>'onListening');

        server.init('pipename');

        setTimeout(() => {
            server.close();

            expect(stub.called).to.equal(true);
            stub.restore();
            done();
        })
    });

    it('should start listening on init() and call onListening', (done: Mocha.Done) => {
        var spy = sinon.spy(server, <any>'onListening');

        server.init(DEFAULT_PORT);

        setTimeout(() => {
            server.close();

            expect(spy.calledOnce).to.equal(true);
            done();
        });
    });

    it('should exit the program when two servers try init() on the same port', (done: Mocha.Done) => {
        var stub = sinon.stub(process, 'exit');

        server.init(DEFAULT_PORT);
        anotherServer.init(DEFAULT_PORT);

        setTimeout(() => {
            server.close();

            expect(stub.called).to.equal(true);
            stub.restore();
            done();
        });
    });

    it('should exit the program if using the port 80 without proper permissions', (done: Mocha.Done) => {
        var stub = sinon.stub(process, 'exit');

        server.init(80);

        setTimeout(() => {
            expect(stub.called).to.equal(true);
            stub.restore();
            done();
        });
    });
});