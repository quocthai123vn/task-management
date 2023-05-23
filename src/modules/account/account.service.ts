import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/createAccount.dto';
import { Account } from './entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

Injectable();
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  async createAccount(createAccountDto: CreateAccountDto) {
    try {
      const account = this.accountRepository.create(createAccountDto);
      console.log(account);
      return this.accountRepository.save(account);
    } catch (error) {
      console.log(error);
    }
  }
}
