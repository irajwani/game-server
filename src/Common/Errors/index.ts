import { HttpException, HttpStatus } from '@nestjs/common';
import { ERRORS } from './messages';

export class InternalServerException extends HttpException {
  constructor() {
    super(ERRORS.INTERNAL_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export class UserExistsException extends HttpException {
  constructor() {
    super(ERRORS.USER_EXISTS, HttpStatus.BAD_REQUEST);
  }
}

export class InvalidCredentialsException extends HttpException {
  constructor() {
    super(ERRORS.INVALID_CREDENTIALS, HttpStatus.BAD_REQUEST);
  }
}

export class InsufficientPermissionException extends HttpException {
  constructor() {
    super(ERRORS.INSUFFICIENT_PERMISSION, HttpStatus.UNAUTHORIZED);
  }
}

export class MissingTokenHeaderException extends HttpException {
  constructor() {
    super(ERRORS.MISSING_TOKEN_HEADER, HttpStatus.UNAUTHORIZED);
  }
}

export class ClubNotFoundException extends HttpException {
  constructor() {
    super(ERRORS.CLUB_NOT_FOUND, HttpStatus.BAD_REQUEST);
  }
}

export class ClubMembersLimitReachedException extends HttpException {
  constructor() {
    super(ERRORS.CLUB_MEMBERS_LIMIT_REACHED, HttpStatus.BAD_REQUEST);
  }
}

export class InsufficientFundsToCreateClubException extends HttpException {
  constructor() {
    super(ERRORS.CLUB_CREATION_INSUFFICIENT_FUNDS, HttpStatus.BAD_REQUEST);
  }
}

export class InsufficientFundsToJoinClubException extends HttpException {
  constructor() {
    super(ERRORS.CLUB_JOIN_INSUFFICIENT_FUNDS, HttpStatus.BAD_REQUEST);
  }
}

export class ClubMemberExistsException extends HttpException {
  constructor() {
    super(ERRORS.CLUB_MEMBER_EXISTS, HttpStatus.BAD_REQUEST);
  }
}

export class NotClubMemberException extends HttpException {
  constructor() {
    super(ERRORS.NOT_CLUB_MEMBER, HttpStatus.BAD_REQUEST);
  }
}

export class DonationRequestTooSoonException extends HttpException {
  constructor() {
    super(ERRORS.DONATION_REQUEST_TOO_SOON, HttpStatus.BAD_REQUEST);
  }
}

export class DonationRequestNotFoundException extends HttpException {
  constructor() {
    super(ERRORS.DONATION_REQUEST_NOT_FOUND, HttpStatus.BAD_REQUEST);
  }
}

export class DonationRequestExpiredException extends HttpException {
  constructor() {
    super(ERRORS.DONATION_REQUEST_EXPIRED, HttpStatus.BAD_REQUEST);
  }
}

export class DonationRequestFulfilledException extends HttpException {
  constructor() {
    super(ERRORS.DONATION_REQUEST_FULFILLED, HttpStatus.BAD_REQUEST);
  }
}

export class InsufficientFundsException extends HttpException {
  constructor() {
    super(ERRORS.CLUB_DONATE_INSUFFICIENT_FUNDS, HttpStatus.BAD_REQUEST);
  }
}

export class CannotDonateToOwnRequestException extends HttpException {
  constructor() {
    super(ERRORS.CANNOT_DONATE_TO_OWN_REQUEST, HttpStatus.BAD_REQUEST);
  }
}

export enum PostgresErrorCodes {
  UniquePropViolation = '23505',
}
