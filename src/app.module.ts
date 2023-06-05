import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigurationModule } from './modules/configuration/configuration.module';
import { dataSourceOptions } from './modules/typeorm/datasource';
import { AccountModule } from './modules/account/account.module';
import { MailModule } from './modules/mail/mail.module';
import { OtpModule } from './modules/otp/otp.module';
import { TaskModule } from './modules/task/task.module';

export const modules = [
  ConfigurationModule,
  UserModule,
  AccountModule,
  MailModule,
  OtpModule,
  TaskModule,
];
@Module({
  imports: [...modules, TypeOrmModule.forRoot(dataSourceOptions)],
  controllers: [],
  providers: [],
})
export class AppModule {}
