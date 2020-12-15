import { FastifyInstance } from 'fastify';
import * as driverService from './service';
import Driver from './model';

const createDriver = async (): Promise<Driver> => {
  return driverService.createDriver();
};

export default async (app: FastifyInstance): Promise<void> => {
  app.post('/driver', createDriver);
};

