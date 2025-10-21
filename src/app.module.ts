import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/AuthGuard';
import { MailModule } from './modules/mail/mail.module';
// import { PermissionGuard } from './guards/PermissionGuard';
import { PermissionModule } from './modules/permission/permission.module';
import { RoleModule } from './modules/role/role.module';
import { AddressModule } from './modules/address/address.module';
import { FileModule } from './modules/files/file.module';
import { ImagesModule } from './modules/images/images.module';
import { CurrencyRatesModule } from './modules/currencyRates/currencyRates.module';
import { CurrenciesModule } from './modules/currencies/currencies.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.getOrThrow('DB_HOST'),
        port: configService.getOrThrow('DB_PORT'),
        username: configService.getOrThrow('DB_USERNAME'),
        password: configService.getOrThrow('DB_PASSWORD'),
        database: configService.getOrThrow('DB_NAME'),
        entities: [
          join(__dirname, 'database', 'typeorm', '**', '*.orm-entity.{js,ts}'),
        ],
        synchronize: configService.getOrThrow('DB_SYNCHRONIZE') === 'true',
        logging: configService.getOrThrow('DB_LOGGING') === 'true',
        migrationsTableName: 'migrations',
      }),
    }),
    UserModule,
    AuthModule,
    MailModule,
    PermissionModule,
    RoleModule,
    AddressModule,
    FileModule,
    ImagesModule,
    CurrencyRatesModule,
    CurrenciesModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    // {
    //   provide: APP_GUARD,
    //   useClass: PermissionGuard,
    // }
  ],
})
export class AppModule {}
