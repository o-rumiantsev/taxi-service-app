import Knex from 'knex';
import { Model, knexSnakeCaseMappers } from 'objection';

import config from './config';
import app from './app';

const knex = Knex({
  ...config.knex,
  ...knexSnakeCaseMappers(),
});

Model.knex(knex);

app.listen(process.env.PORT, process.env.HOST);
