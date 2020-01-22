import 'reflect-metadata';
import { container } from './inversify.config';
import { Server } from './server';
import Types from './types';
import { DEFAULT_PORT } from './constants';

const server: Server = container.get<Server>(Types.Server);

//server.init(DEFAULT_PORT);
server.init(DEFAULT_PORT);