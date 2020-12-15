import Driver from '../models/Driver';
import Order from '../models/Order';
import { OrderStatus } from '../enums/OrderStatus';

const isOrderUncompleted = (order: Order): boolean =>
  order.status !== OrderStatus.COMPLETED;

const isDriverFree = ({ orders }: Driver): boolean =>
  orders.length === 0 || !orders.some(isOrderUncompleted);

export const getFreeDriver = async (): Promise<Driver|null> => {
  const drivers = await Driver.query().withGraphFetched('orders');
  return drivers.filter(isDriverFree)[0] || null;
};

export const createDriver = async (): Promise<Driver> => {
  return Driver.query().insert({});
};
