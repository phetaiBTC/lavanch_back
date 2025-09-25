import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { SendMailUseCase } from './application/send-mail.usecase';
import { MailServiceImpl } from './infrastructure/mail.service.impl';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config) => ({
        global: true,
        transport: {
          host: config.getOrThrow('SMTP_HOST'),
          port: config.getOrThrow('SMTP_PORT'),
          secure: config.getOrThrow('SMTP_SECURE') === 'true',
          auth: {
            user: config.getOrThrow('SMTP_USER'),
            pass: config.getOrThrow('SMTP_PASSWORD'),
          },
        },
        defaults: {
          from: config.getOrThrow('SMTP_FROM'),
        },
        template: {
            dir: join(process.cwd(), 'src/modules/mail/templates'),
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
        }
      }),
    }),
  ],
  providers: [
    SendMailUseCase,
    { provide: 'IMailService', useClass: MailServiceImpl },
  ],
  exports: [SendMailUseCase],
})
export class MailModule {}
