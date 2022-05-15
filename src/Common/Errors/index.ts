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
    super(
      ERRORS.CLUB_CREATION_INSUFFICIENT_FUNDS_EXCEPTION,
      HttpStatus.BAD_REQUEST,
    );
  }
}

export class InsufficientFundsToJoinClubException extends HttpException {
  constructor() {
    super(
      ERRORS.CLUB_JOIN_INSUFFICIENT_FUNDS_EXCEPTION,
      HttpStatus.BAD_REQUEST,
    );
  }
}

export class ClubMemberExistsException extends HttpException {
  constructor() {
    super(ERRORS.CLUB_MEMBER_EXISTS_EXCEPTION, HttpStatus.BAD_REQUEST);
  }
}

export enum PostgresErrorCodes {
  UniquePropViolation = '23505',
}
