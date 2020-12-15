import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('customers', tableBuilder => {
    tableBuilder.increments('id').primary();
    tableBuilder.timestamps(true, true);
  });

  await knex.schema.createTable('drivers', tableBuilder => {
    tableBuilder.increments('id').primary();
    tableBuilder.timestamps(true, true);
  });

  await knex.schema.createTable('orders', tableBuilder => {
    tableBuilder.increments('id').primary();
    tableBuilder.integer('driver_id').references('drivers.id');
    tableBuilder.integer('customer_id').references('customers.id');
    tableBuilder.enum(
      'status',
      [
        'pending',
        'active',
        'completed',
      ]
    ).notNullable();
    tableBuilder.timestamp('arrival_time');
    tableBuilder.timestamp('pickup_time');
    tableBuilder.string('source_address').notNullable();
    tableBuilder.string('destination_address').notNullable();
    tableBuilder.double('price').notNullable();
    tableBuilder.timestamps(true, true);
  });
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('orders');
  await knex.schema.dropTable('drivers');
  await knex.schema.dropTable('customers');
}

