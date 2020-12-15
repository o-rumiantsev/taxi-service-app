export default {
  create: {
    body: {
      type: 'object',
      required: ['customerId', 'sourceAddress', 'destinationAddress'],
      properties: {
        customerId: { type: 'number' },
        sourceAddress: { type: 'string' },
        destinationAddress: { type: 'string' },
      },
    },
  },
  start: {
    body: {
      type: 'object',
      required: ['orderId'],
      properties: {
        orderId: { type: 'number' },
      },
    },
  },
  complete: {
    body: {
      type: 'object',
      required: ['orderId'],
      properties: {
        orderId: { type: 'number' },
      },
    },
  },
  get: {
    querystring: {
      type: 'object',
      properties: {
        driverId: { type: 'number' },
      },
    },
  },
}