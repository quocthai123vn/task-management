import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';

export class UserNotExistsException extends BaseException {
  constructor(id: string) {
    super(`User with id ${id} not exists`, HttpStatus.NOT_FOUND);
  }
}
