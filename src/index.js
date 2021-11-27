import http from 'http';
import path from 'path';
import { logg } from './logging/index.js';
import { getApp } from './app/index.js';

const HOST = String(process.env.HOST || '');
const PORT = Number(process.env.PORT || 5000);

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

logg(`Running: ${path.relative('..', process.argv[1])}`, {
  fg: isDev ? '#44F' : '#F80',
  bg: '#000',
});

const server = http.createServer(getApp({ doLog: true }));

server.on('listening', () => {
  const { address, port } = server.address();
  logg(`Server started: ${address}:${port}`);
});

server.on('connection', (socket) => {
  logg(`Client connected: ${socket.remoteAddress}:${socket.remotePort}`);
});

server.listen(PORT, HOST);
