# Taxi Service App

## Tech stack
___

- _Containerization_ - docker
- _Package manager_ - yarn
- _Linter_ - Eslint
- _Web framework_ - Fastify
- _Database_ - PostgreSQL
- _ORM_ - ObjectionJS
- _Migration tool_ - Knex (it is also used as query builder for ORM)

## API
___

Application has the next API endpoints:

| Path                       | Method | Description                                                                                                                |
|----------------------------|--------|----------------------------------------------------------------------------------------------------------------------------|
| driver/                    | POST   | Create driver                                                                                                              |
| order/                     | POST   | Create order with pending status. If user is on drive, then return error. If there are no free drivers, then return error. |
| order/start                | PATCH  | Start drive If order is not pending, then return error.                                                                    |
| order/complete             | PATCH  | Complete drive If order is not active, then return error.                                                                  |
| orders/                    | GET    | Get orders. If driverId query param is passed, then return driver orders                                                   |
| stats/favourte_destination | GET    | Get favourite driver's destination                                                                                         |
| stats/orders_count         | GET    | Get driver's orders count                                                                                                  |
| stats/average_drive_time   | GET    | Get driver's average drive time                                                                                            |
| stats/total_orders_price   | GET    | Get driver's total orders price                                                                                            |

Example environment and collection are stored in `postman/` folder.

## Deployment
___

1. Before you start application, you should create .env file based on .env.dist. 
   Fill variables in the next way:
   
 ```shell
PGHOST=db
PGUSER=postgres
PGPASSWORD=postgres
PGDATABASE=postgres
PGPORT=5432
PORT=3000
HOST=0.0.0.0
 ```
2. To start application you need to run this command in project directory: `$ docker-compose up -d`
3. After that, you can import Postman collection and environment to your Postman app and try different endpoints.

