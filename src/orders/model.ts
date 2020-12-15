import { Model, RelationMappings } from 'objection';
import Driver from '../drivers/model';
import Customer from '../customers/model';

import { OrderStatus } from '../enums/OrderStatus';

export default class Order extends Model {
  id?: number;
  price!: number;
  sourceAddress!: string;
  destinationAddress!: string;
  arrivalTime!: Date;
  pickupTime!: Date;
  status!: OrderStatus;
  driverId!: number;
  customerId!: number;

  static tableName = 'orders';

  static relationMappings = (): RelationMappings => ({
    driver: {
      relation: Model.BelongsToOneRelation,
      modelClass: Driver,
      join: {
        from: 'orders.driverId',
        to: 'drivers.id',
      }
    },
    customer: {
      relation: Model.BelongsToOneRelation,
      modelClass: Customer,
      join: {
        from: 'orders.customerId',
        to: 'customers.id',
      },
    }
  });
}
