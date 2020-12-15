import * as path from 'path';
import fastify from 'fastify';
import AutoLoad from 'fastify-autoload';

const app = fastify({
  logger: true
});

app.register(AutoLoad, { dir: path.join(__dirname, 'routes') });

export default app;
