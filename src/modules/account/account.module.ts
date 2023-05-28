import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { ConfigurationService } from '../configuration/configuration.service';
import { JWT_CONSTANTS } from 'src/shares/constants/jwt.constant';
import { JwtModule } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service';
import { User } from '../user/entities/user.entity';
import { OtpModule } from '../otp/otp.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account, User]),
    JwtModule.register({
      global: true,
      secret: JWT_CONSTANTS.secret,
      signOptions: JWT_CONSTANTS.signOptions,
    }),
    OtpModule,
    UserModule,
  ],
  controllers: [AccountController],
  providers: [AccountService, ConfigurationService, MailService],
})
export class AccountModule {}
