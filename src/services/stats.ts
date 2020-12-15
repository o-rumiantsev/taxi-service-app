/* eslint-disable @typescript-eslint/ban-ts-comment */
import Order from '../models/Order';
import { OrderStatus } from '../enums/OrderStatus';

export const favouriteDestination = async (
  { driverId }: Routes.Stats.ByDriverQuerystring
): Promise<Routes.Stats.Response.FavouriteDestination> => {
  const [result] = await Order.query()
    .where({ driverId })
    .select('destinationAddress')
    .count('*')
    .groupBy('destinationAddress')
    .orderBy('count')
    .limit(1);

  return { favouriteDestination: result.destinationAddress };
};

export const ordersCount = async (
  { driverId }: Routes.Stats.ByDriverQuerystring
): Promise<Routes.Stats.Response.OrdersCount> => {
  const [result] = await Order.query()
    .where({ driverId })
    .count();

  // @ts-ignore
  return { ordersCount: result.count };
};

export const averageDriveTime = async (
  { driverId }: Routes.Stats.ByDriverQuerystring
): Promise<Routes.Stats.Response.AverageDriveTime> => {
  const [result] = await Order.query()
    .where({ driverId, status: OrderStatus.COMPLETED })
    .avg(Order.knex().raw('"arrival_time" - "pickup_time"'));

  // @ts-ignore
  return { averageDriveTime: result.avg.toPostgres() };
};

export const totalOrdersPrice = async (
  { driverId }: Routes.Stats.ByDriverQuerystring
): Promise<Routes.Stats.Response.TotalOrdersPrice> => {
  const [result] = await Order.query()
    .where({ driverId })
    .sum('price');

  // @ts-ignore
  return { totalOrdersPrice: result.sum };
};

