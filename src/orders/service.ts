import config from '../config';
import { errors } from '../errors';
import { OrderStatus } from '../enums/OrderStatus';
import { getCustomer } from '../customers/service';
import { getFreeDriver } from '../drivers/service';
import Order from './model';

const random = (min: number, max: number): number =>
  Math.round(Math.random() * (max - min) + min);

const getDriverOrders = async (driverId: number): Promise<Order[]> => {
  return Order.query().where({ driverId });
};

const getCustomerOrders = async (
  customerId: number,
  status?: OrderStatus
): Promise<Order[]> => {
  return Order.query().where({
    customerId,
    ...(status ? { status } : null),
  });
};

export const createNewOrder = async (
  orderData: Routes.Order.CreateBody
): Promise<Order> => {
  const customerActiveOrders = await getCustomerOrders(
    orderData.customerId,
    OrderStatus.ACTIVE
  );

  if (customerActiveOrders.length) {
    throw errors.ERR_CUSTOMER_ON_DRIVE;
  }

  const driver = await getFreeDriver();

  if (!driver) {
    throw errors.ERR_NO_FREE_DRIVERS;
  }

  const customer = await getCustomer(orderData.customerId);
  return Order.query().insert({
    driverId: driver.id,
    customerId: customer.id,
    price: random(config.orderPrice.min, config.orderPrice.max),
    sourceAddress: orderData.sourceAddress,
    destinationAddress: orderData.destinationAddress,
    status: OrderStatus.PENDING,
  });
};

export const startOrder = async (
  { orderId }: Routes.Order.StartBody
): Promise<Order> => {
  const order = await Order.query().findOne({ id: orderId });

  if (!order) {
    throw errors.ERR_NO_SUCH_ORDER;
  }

  if (order.status !== OrderStatus.PENDING) {
    throw errors.ERR_CANNOT_START_ORDER;
  }

  return order.$query().updateAndFetch({
    status: OrderStatus.ACTIVE,
    pickupTime: new Date(),
  });
};

export const completeOrder = async (
  { orderId }: Routes.Order.CompleteBody
): Promise<Order> => {
  const order = await Order.query().findOne({ id: orderId });

  if (!order) {
    throw errors.ERR_NO_SUCH_ORDER;
  }

  if (order.status !== OrderStatus.ACTIVE) {
    throw errors.ERR_CANNOT_COMPLETE_ORDER;
  }

  return order.$query().updateAndFetch({
    status: OrderStatus.COMPLETED,
    arrivalTime: new Date(),
  });
};

export const getOrders = async (
  query: Routes.Order.GetQuerystring
): Promise<Order[]> => {
  if (query.driverId) {
    return getDriverOrders(query.driverId);
  } else {
    return Order.query();
  }
};
