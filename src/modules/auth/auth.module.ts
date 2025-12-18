import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';

import { LoginAuthUseCase } from './application/queries/login-Auth.usecase';
import { JwtStrategy } from './application/queries/jwt.strategy';
import { RegisterUserUseCase } from './application/command/register-Auth.usecase';
import { MailModule } from '../mail/mail.module';
import { RoleModule } from '../role/role.module';
@Module({
  imports: [
    UserModule,
    MailModule,
    RoleModule,
    JwtModule.registerAsync({
      global: true,
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: process.env.JWT_EXPIRATION },
      }),
    }),
  ],
  providers: [LoginAuthUseCase, RegisterUserUseCase, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
