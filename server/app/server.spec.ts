/* tslint:disable:no-any no-magic-numbers */
import { expect } from 'chai';
import * as sinon from 'sinon';

import { Server } from './server';

import { container } from './inversify.config';
import Types from './types';

import { DEFAULT_PORT } from './constants';

describe('Server', () => {

  let server: Server;
  let anotherServer: Server;

  beforeEach(() => {
    server = container.get<Server>(Types.Server);
    anotherServer = container.get<Server>(Types.Server);
  });

  it('should init with an int port parameter', (done: Mocha.Done) => {
    const stub = sinon.stub(server, 'onListening' as any);

    server.init(DEFAULT_PORT);

    setTimeout(() => {
      server.close();

      expect(stub.called).to.equal(true);
      stub.restore();
      done();
    });
  });

  it('should init with a string port parameter', (done: Mocha.Done) => {
    const stub = sinon.stub(server, 'onListening' as any);

    server.init(DEFAULT_PORT.toString());

    setTimeout(() => {
      server.close();

      expect(stub.called).to.equal(true);
      stub.restore();
      done();
    });
  });

  it('should init with a string pipe name', (done: Mocha.Done) => {
    const stub = sinon.stub(server, 'onListening' as any);

    server.init('pipename');

    setTimeout(() => {
      server.close();

      expect(stub.called).to.equal(true);
      stub.restore();
      done();
    });
  });

  it('should start listening on init() and call onListening', (done: Mocha.Done) => {
    const spy = sinon.spy(server, 'onListening' as any);

    server.init(DEFAULT_PORT);

    setTimeout(() => {
      server.close();

      expect(spy.calledOnce).to.equal(true);
      done();
    });
  });

  it('should exit the program when two servers try init() on the same port', (done: Mocha.Done) => {
    const stub = sinon.stub(process, 'exit');

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
    const stub = sinon.stub(process, 'exit');

    server.init(80);

    setTimeout(() => {
      expect(stub.called).to.equal(true);
      stub.restore();
      done();
    });
  });
});
