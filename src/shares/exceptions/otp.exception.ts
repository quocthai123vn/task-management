import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';

export class OtpExpireException extends BaseException {
  constructor() {
    super('OTP is expired', HttpStatus.BAD_REQUEST);
  }
}

export class OtpInvalidException extends BaseException {
  constructor() {
    super('OTP invalid', HttpStatus.BAD_REQUEST);
  }
}
