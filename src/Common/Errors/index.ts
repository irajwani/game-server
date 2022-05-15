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

export class InsufficientFundsException extends HttpException {
  constructor() {
    super(ERRORS.INSUFFICIENT_FUNDS, HttpStatus.BAD_REQUEST);
  }
}

export enum PostgresErrorCodes {
  UniquePropViolation = '23505',
}
