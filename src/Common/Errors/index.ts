import { HttpException, HttpStatus } from '@nestjs/common';
import { ERRORS } from './messages';

export class UserExistsException extends HttpException {
  constructor() {
    super(ERRORS.USER_EXISTS, HttpStatus.BAD_REQUEST);
  }
}
