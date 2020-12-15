import {
  FastifyInstance,
  FastifyRequest,
} from 'fastify';
import * as orderService from './service';
import orderSchema from './schema';
import Order from './model';

const createOrder = async (
  request: FastifyRequest<Routes.Order.Create>,
): Promise<Order> => {
  return orderService.createNewOrder(request.body);
};

const startOrder = async (
  request: FastifyRequest<Routes.Order.Start>,
): Promise<Order> => {
  return orderService.startOrder(request.body);
};

const completeOrder = async (
  request: FastifyRequest<Routes.Order.Complete>,
): Promise<Order> => {
  return orderService.completeOrder(request.body);
};

const getOrders = async (
  request: FastifyRequest<Routes.Order.Get>,
): Promise<Order[]> => {
  return orderService.getOrders(request.query);
};

export default async (app: FastifyInstance): Promise<void> => {
  app.get('/orders', { schema: orderSchema.get }, getOrders);
  app.post('/order', { schema: orderSchema.create }, createOrder);
  app.patch('/order/start', { schema: orderSchema.start }, startOrder);
  app.patch(
    '/order/complete',
    { schema: orderSchema.complete },
    completeOrder
  );
};
