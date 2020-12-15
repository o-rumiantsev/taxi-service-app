import { development } from './knexfile.js';

export default {
  knex: development,
  orderPrice: {
    min: 100,
    max: 1000,
  },
};
