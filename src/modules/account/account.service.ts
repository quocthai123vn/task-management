import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { Account } from './entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigurationService } from '../configuration/configuration.service';
import { InitAdminDto } from './dto/init-admin.dto';
import {
  AccountInactive,
  EmailAdminInvalid,
  EmailNotFound,
  PasswordInvalid,
} from 'src/shares/exceptions/account.exception';
import { OtpService } from '../otp/otp.service';
import { VerifyAdminDto } from './dto/verify-admin.dto';
import { hashString, isHashEqual } from 'src/shares/helpers/hash.helper';
import { SignInDto } from './dto/sign-in.dto';
import { AccountRoleEnum, Position } from 'src/shares/constants/enum.constant';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { JWT_CONSTANTS } from 'src/shares/constants/jwt.constant';
import { ResetPasswordDto } from './dto/reset-password.dto';

Injectable();
export class AccountService {
  private readonly admin;
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    private readonly configurationService: ConfigurationService,
    private readonly userService: UserService,
    private readonly otpService: OtpService,
    private readonly jwtService: JwtService,
  ) {
    const admin = this.configurationService.getAdminEmail();
  }

  async initAdminAccount(initAdminDto: InitAdminDto) {
    const { email } = initAdminDto;
    if (email !== this.admin) {
      throw new EmailAdminInvalid(email);
    }
    const contact = email;
    await this.otpService.sendOtp({ contact });
  }

  async verifyAdminAccount(verifyAdminDto: VerifyAdminDto) {
    const { otp, password } = verifyAdminDto;
    await this.otpService.verifyOtp({
      contact: this.admin,
      otp,
    });
    const hashPassword = await hashString(password);
    const account = this.accountRepository.create({
      hashPassword,
      email: this.admin,
      role: AccountRoleEnum.admin,
      isActive: true,
    });
    const createUserDto = {
      firstName: 'Admin',
      lastName: '',
      position: Position.manager,
      accountId: account._id,
    };
    await this.userService.createUser(createUserDto);
    return await this.accountRepository.save(account);
  }

  async createAccount(createAccountDto: CreateAccountDto) {
    const account = this.accountRepository.create(createAccountDto);
    return this.accountRepository.save(account);
  }

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;
    const account = await this.accountRepository.findOne({
      where: { email },
    });
    if (!account) {
      throw new EmailNotFound(email);
    }
    if (!account.isActive) {
      throw new AccountInactive();
    }
    const checkPassword = await isHashEqual(password, account.hashPassword);
    if (!checkPassword) {
      throw new PasswordInvalid();
    }
    const payload = {
      accountId: account._id,
      role: account.role,
    };
    const token = this.jwtService.signAsync(payload, {
      expiresIn: JWT_CONSTANTS.signOptions.expiresIn,
      secret: JWT_CONSTANTS.secret,
    });
    return token;
  }

  async forgotPassword(forgotPasswordDto: InitAdminDto) {
    const { email } = forgotPasswordDto;
    const account = await this.accountRepository.findOne({
      where: { email },
    });
    if (!account) {
      throw new EmailNotFound(email);
    }
    const contact = email;
    await this.otpService.sendOtp({ contact });
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const { email, otp, password } = resetPasswordDto;
    await this.otpService.verifyOtp({
      contact: email,
      otp,
    });
    const hashPassword = await hashString(password);
    const account = await this.accountRepository.update(
      { email },
      {
        hashPassword,
      },
    );
    return account;
  }
}
