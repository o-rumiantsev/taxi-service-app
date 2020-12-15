import fastify from 'fastify';
import orders from './orders/routes';
import drivers from './drivers/routes';
import stats from './stats/routes';

const app = fastify({
  logger: true
});

app.register(orders);
app.register(drivers);
app.register(stats);

export default app;
