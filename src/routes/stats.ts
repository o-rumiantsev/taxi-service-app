import {FastifyInstance, FastifyRequest} from 'fastify';
import * as statsService from '../services/stats';

const favouriteDestination = async (
  request: FastifyRequest<Routes.Stats.ByDriver>,
): Promise<Routes.Stats.Response.FavouriteDestination> => {
  return statsService.favouriteDestination(request.query);
};

const ordersCount = async (
  request: FastifyRequest<Routes.Stats.ByDriver>,
): Promise<Routes.Stats.Response.OrdersCount> => {
  return statsService.ordersCount(request.query);
};

const averageDriveTime = async (
  request: FastifyRequest<Routes.Stats.ByDriver>,
): Promise<Routes.Stats.Response.AverageDriveTime> => {
  return statsService.averageDriveTime(request.query);
};

const totalOrdersPrice = async (
  request: FastifyRequest<Routes.Stats.ByDriver>,
): Promise<Routes.Stats.Response.TotalOrdersPrice> => {
  return statsService.totalOrdersPrice(request.query);
};

export default async (app: FastifyInstance): Promise<void> => {
  app.get('/stats/favourite_destination', favouriteDestination);
  app.get('/stats/orders_count', ordersCount);
  app.get('/stats/average_drive_time', averageDriveTime);
  app.get('/stats/total_orders_price', totalOrdersPrice);
};

