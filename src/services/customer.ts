import Customer from '../models/Customer';

export const getCustomer = async (customerId: number): Promise<Customer> => {
  const [customer] = await Customer.query().where({ id: customerId });

  if (customer) {
    return customer;
  }

  return Customer
    .query()
    .insert({ id: customerId });
};
