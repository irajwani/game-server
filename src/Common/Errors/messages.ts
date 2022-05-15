// import { CONSTANTS } from '../constants';

const ERRORS = {
  INTERNAL_SERVER: {
    code: 1,
    error: 'INTERNAL_SERVER_ERROR',
    message: 'Internal Server Error',
  },
  USER_EXISTS: {
    code: 2,
    error: 'USER_EXISTS_ERROR',
    message: 'User with this email already exists',
  },
  INVALID_CREDENTIALS: {
    code: 3,
    error: 'INVALID_CREDENTIALS_ERROR',
    message: 'Incorrect email/password',
  },
  INSUFFICIENT_PERMISSION: {
    code: 4,
    error: 'INSUFFICIENT_PERMISSION_ERROR',
    message: 'You are not authorized. Please use a valid token.',
  },
  MISSING_TOKEN_HEADER: {
    code: 5,
    error: 'MISSING_TOKEN_HEADER_ERROR',
    message:
      "This endpoint is a protected resource. Please specify a 'token' in headers",
  },
  INSUFFICIENT_FUNDS: {
    code: 6,
    error: 'INSUFFICIENT_FUNDS_ERROR',
    message:
      'You have insufficient funds to perform this action. Please top up your wallet.',
  },
};

export { ERRORS };
