import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigurationModule } from './modules/configuration/configuration.module';
import { dataSourceOptions } from './modules/typeorm/datasource';
import { AccountModule } from './modules/account/account.module';

export const modules = [ConfigurationModule, UserModule, AccountModule];
@Module({
  imports: [...modules, TypeOrmModule.forRoot(dataSourceOptions)],
  controllers: [],
  providers: [],
})
export class AppModule {}
