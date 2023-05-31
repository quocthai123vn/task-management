import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountRoleEnum, Position } from 'src/shares/constants/enum.constant';
import { JWT_CONSTANTS } from 'src/shares/constants/jwt.constant';
import {
  AccountInactive,
  EmailAdminInvalid,
  EmailNotFound,
  PasswordInvalid,
} from 'src/shares/exceptions/account.exception';
import { hashString, isHashEqual } from 'src/shares/helpers/hash.helper';
import { Repository } from 'typeorm';
import { ConfigurationService } from '../configuration/configuration.service';
import { OtpService } from '../otp/otp.service';
import { UserService } from '../user/user.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { ActiveAccountDto } from './dto/inactive-account.dto';
import { InitAdminDto } from './dto/init-admin.dto';
import { SetPasswordDto } from './dto/set-password.dto';
import { SignInDto } from './dto/sign-in.dto';
import { VerifyAdminDto } from './dto/verify-admin.dto';
import { Account } from './entities/account.entity';

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
    this.admin = this.configurationService.getAdminEmail();
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
    const { email, firstName, lastName, position } = createAccountDto;
    const account = this.accountRepository.create(createAccountDto);
    await this.userService.createUser({
      firstName,
      lastName,
      position,
      accountId: account._id,
    });
    await this.otpService.sendOtp({ contact: email });
    return await this.accountRepository.save(account);
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
    const user = await this.userService.findUserByAccountId(account._id);
    const payload = {
      accountId: account._id,
      role: account.role,
      userId: user._id,
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

  async setPassword(setPasswordDto: SetPasswordDto) {
    const { email, otp, password } = setPasswordDto;
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

  async activeAccount(activeAccountDto: ActiveAccountDto) {
    const { accountId, isActive } = activeAccountDto;
    await this.accountRepository.update({ _id: accountId }, { isActive });
  }

  async getAllUserEmails(): Promise<string[]> {
    const accounts = await this.accountRepository.find();
    return accounts.map((account) => account.email);
  }
}
