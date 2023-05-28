import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';

export class EmailAdminInvalid extends BaseException {
  constructor(email: string) {
    super(`Email ${email} is not admin email`, HttpStatus.BAD_REQUEST);
  }
}

export class EmailNotFound extends BaseException {
  constructor(email: string) {
    super(`Email ${email} not found`, HttpStatus.BAD_REQUEST);
  }
}

export class PasswordInvalid extends BaseException {
  constructor() {
    super(`Password invalid`, HttpStatus.BAD_REQUEST);
  }
}

export class AccountInactive extends BaseException {
  constructor() {
    super(`Account inactive`, HttpStatus.BAD_REQUEST);
  }
}
