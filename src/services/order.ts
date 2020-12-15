import Order from '../models/Order';
import { OrderStatus } from '../enums/OrderStatus';
import { getFreeDriver } from './driver';
import { getCustomer } from './customer';

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
    throw new Error('Customer is already on drive');
  }

  const driver = await getFreeDriver();

  if (!driver) {
    throw new Error('No free drivers available');
  }

  const customer = await getCustomer(orderData.customerId);
  return Order.query().insert({
    driverId: driver.id,
    customerId: customer.id,
    price: random(100, 1000),
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
    throw new Error('No such order');
  }

  if (order.status !== OrderStatus.PENDING) {
    throw new Error('Cannot start order which is not pending');
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
    throw new Error('No such order');
  }

  if (order.status !== OrderStatus.ACTIVE) {
    throw new Error('Cannot start order which is not active');
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
