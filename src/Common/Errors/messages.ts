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
  CLUB_NOT_FOUND: {
    code: 6,
    error: 'CLUB_NOT_FOUND_ERROR',
    message: 'Club with that ID does not exist.',
  },
  CLUB_MEMBERS_LIMIT_REACHED: {
    code: 7,
    error: 'CLUB_MEMBERS_LIMIT_REACHED_ERROR',
    message: 'The number of allowed members for this club has been reached.',
  },
  CLUB_CREATION_INSUFFICIENT_FUNDS_EXCEPTION: {
    code: 8,
    error: 'CLUB_MEMBERS_LIMIT_REACHED_ERROR',
    message:
      'You have insufficient funds to perform this action. Please top up your wallet with 50 hard_currency',
  },
  CLUB_JOIN_INSUFFICIENT_FUNDS_EXCEPTION: {
    code: 9,
    error: 'CLUB_MEMBERS_LIMIT_REACHED_ERROR',
    message:
      'You have insufficient funds to perform this action. Please top up your wallet with 100 soft_currency',
  },
  CLUB_MEMBER_EXISTS_EXCEPTION: {
    code: 11,
    error: 'CLUB_MEMBER_EXISTS_EXCEPTION_ERROR',
    message: 'User is already part of this club',
  },
};

export { ERRORS };
