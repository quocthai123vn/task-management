import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigurationService } from '../configuration/configuration.service';
import { ConfigurationModule } from '../configuration/configuration.module';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigurationModule],
      inject: [ConfigurationService],
      useFactory: (configurationService: ConfigurationService) => {
        return {
          transport: configurationService.getSMTPConfig(),
          template: {
            dir: __dirname + '/templates',
            adapter: new HandlebarsAdapter(), // Use HandlebarsAdapter
            options: {
              strict: true,
            },
          },
        };
      },
    }),
  ],
  controllers: [],
  providers: [MailService],
})
export class MailModule {}
