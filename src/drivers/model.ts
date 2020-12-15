import { Model, RelationMappings } from 'objection';
import Order from '../orders/model';

export default class Driver extends Model {
  id!: number;
  orders!: Order[];

  static tableName = 'drivers';

  static relationMappings = (): RelationMappings => ({
    orders: {
      relation: Model.HasManyRelation,
      modelClass: Order,
      join: {
        from: 'drivers.id',
        to: 'orders.driverId',
      }
    },
  });
}
