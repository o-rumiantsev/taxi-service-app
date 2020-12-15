import { FastifyInstance } from 'fastify';
import * as driverService from '../services/driver';
import Driver from '../models/Driver';

const createDriver = async (): Promise<Driver> => {
  return driverService.createDriver();
};

export default async (app: FastifyInstance): Promise<void> => {
  app.post('/driver', createDriver);
};

