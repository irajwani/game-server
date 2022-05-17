import Constants from '../constants';

const {
  CLUB_CREATION_COST,
  CLUB_ENTRY_COST,
  CLUB_MEMBERS_LIMIT,
  DONATION_REQUEST_EXPIRATION_MINUTES,
  MANDATORY_MINUTES_SINCE_LAST_DONATION_REQUEST,
} = Constants;

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
    message: `The number of allowed members (${CLUB_MEMBERS_LIMIT}) for this club has been reached.`,
  },
  CLUB_CREATION_INSUFFICIENT_FUNDS: {
    code: 8,
    error: 'CLUB_CREATION_INSUFFICIENT_FUNDS_ERROR',
    message: `You have insufficient funds to perform this action. Please top up your wallet with ${CLUB_CREATION_COST} hard_currency`,
  },
  CLUB_JOIN_INSUFFICIENT_FUNDS: {
    code: 9,
    error: 'CLUB_JOIN_INSUFFICIENT_FUNDS_ERROR',
    message: `You have insufficient funds to perform this action. Please top up your wallet with ${CLUB_ENTRY_COST} soft_currency`,
  },
  CLUB_MEMBER_EXISTS: {
    code: 10,
    error: 'CLUB_MEMBER_EXISTS_ERROR',
    message: 'User is already part of this club',
  },
  NOT_CLUB_MEMBER: {
    code: 11,
    error: 'NOT_CLUB_MEMBER_ERROR',
    message: 'User is not a part of this club',
  },
  DONATION_REQUEST_TOO_SOON: {
    code: 12,
    error: 'DONATION_REQUEST_TOO_SOON_ERROR',
    message: `User cannot issue a new donation request for this club. It has not been ${MANDATORY_MINUTES_SINCE_LAST_DONATION_REQUEST} minutes since last donation request.`,
  },
  DONATION_REQUEST_NOT_FOUND: {
    code: 13,
    error: 'DONATION_REQUEST_NOT_FOUND_ERROR',
    message: 'No donation has been requested for this club.',
  },
  DONATION_REQUEST_EXPIRED: {
    code: 14,
    error: 'DONATION_REQUEST_EXPIRED_ERROR',
    message: `The donation period of ${DONATION_REQUEST_EXPIRATION_MINUTES} minutes has expired for this donation request.`,
  },
  CLUB_DONATE_INSUFFICIENT_FUNDS: {
    code: 15,
    error: 'CLUB_DONATE_INSUFFICIENT_FUNDS_ERROR',
    message: `You have insufficient funds to perform this action.`,
  },
  CANNOT_DONATE_TO_OWN_REQUEST: {
    code: 16,
    error: 'CANNOT_DONATE_TO_OWN_REQUEST_ERROR',
    message: `User is not allowed to donate to donation request they created.`,
  },
};

export { ERRORS };
