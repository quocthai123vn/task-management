import { Injectable } from '@nestjs/common';
import { UserNotExistsException } from 'src/shares/exceptions/user.exception';

Injectable();
export class UserService {
  constructor() {}
  getUser() {
    throw new UserNotExistsException('123');  
  }
}
 