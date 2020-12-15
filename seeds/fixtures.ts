import * as Knex from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex('orders').del();
    await knex('drivers').del();
    await knex('customers').del();

    const [driverId] = await knex('drivers')
      .insert({})
      .returning('id');

    const customerIds = await knex('customers')
      .insert([{ id: undefined }, { id: undefined }])
      .returning('id');

    await knex('orders').insert([
        {
            driver_id: driverId,
            customer_id: customerIds[0],
            status: 'pending',
            source_address: 'source',
            destination_address: 'destination',
            price: 100,
        },
        {
            driver_id: driverId,
            customer_id: customerIds[1],
            status: 'completed',
            arrival_time: new Date(),
            pickup_time: new Date(Date.now() - 45 * 60 * 1000),  /* 45 minutes ago */
            source_address: 'source',
            destination_address: 'destination',
            price: 100,
        },
        {
            driver_id: driverId,
            customer_id: customerIds[0],
            status: 'active',
            pickup_time: new Date(Date.now() - 45 * 60 * 1000),  /* 45 minutes ago */
            source_address: 'source',
            destination_address: 'destination',
            price: 100,
        },
    ]);
}
