import 'ts-node';
import * as path from 'path';
import Knex from 'knex';

export const development: Knex.Config = {
  client: 'pg',
  connection: {
    host: process.env.PGHOST,
    port: parseInt(process.env.PGPORT),
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
  },
  migrations: {
    extension: 'ts',
    directory: path.join(__dirname, '../../', 'migrations'),
  },
  seeds: {
    extension: 'ts',
    directory: path.join(__dirname, '../../', 'seeds'),
  },
};
