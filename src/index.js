import http from 'http';
import { stringify } from './utils/stringify.js';

const server = http.createServer();

server.on('request', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;
  res.end(
    JSON.stringify({
      data: 'Hello World!',
    })
  );
});

server.listen(8000, () => {
  const address = stringify(server.address());
  console.log(`Server started on: ${address}`);
});
