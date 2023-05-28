import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { ConfigurationService } from '../configuration/configuration.service';
import { OtpController } from './otp.controller';
import { MailService } from '../mail/mail.service';

@Module({
  imports: [],
  controllers: [OtpController],
  providers: [OtpService, ConfigurationService, MailService],
  exports: [OtpService],
})
export class OtpModule {}
