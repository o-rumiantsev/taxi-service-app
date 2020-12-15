import { Model } from 'objection';

export default class Customer extends Model {
  id!: number;
  static tableName = 'customers';
}
