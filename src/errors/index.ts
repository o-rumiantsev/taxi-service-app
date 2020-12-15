import APIError from './APIError';

export const errorCodes = {
  ERR_NO_SUCH_ORDER: 601,
  ERR_CANNOT_START_ORDER: 602,
  ERR_CANNOT_COMPLETE_ORDER: 603,
  ERR_CUSTOMER_ON_DRIVE: 604,
  ERR_NO_FREE_DRIVERS: 605,
};

export const errors = {
  ERR_NO_SUCH_ORDER:
    new APIError('No such order', errorCodes.ERR_NO_SUCH_ORDER),
  ERR_CANNOT_START_ORDER:
    new APIError('Cannot start order', errorCodes.ERR_CANNOT_START_ORDER),
  ERR_CANNOT_COMPLETE_ORDER:
    new APIError(
      'Cannot complete order',
      errorCodes.ERR_CANNOT_COMPLETE_ORDER
    ),
  ERR_CUSTOMER_ON_DRIVE:
    new APIError('Customer is on drive', errorCodes.ERR_CUSTOMER_ON_DRIVE),
  ERR_NO_FREE_DRIVERS:
    new APIError('No free drivers', errorCodes.ERR_NO_FREE_DRIVERS),
};
