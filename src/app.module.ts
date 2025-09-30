import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { UserModule } from './modules/User/User.module';
import { AuthModule } from './modules/Auth/Auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/AuthGuard';
import { MailModule } from './modules/mail/mail.module';
import { PermissionGuard } from './guards/PermissionGuard';
import { PermissionModule } from './modules/Permission/Permission.module';
import { RoleModule } from './modules/Role/Role.module';
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
    RoleModule
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
