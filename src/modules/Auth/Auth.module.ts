import { Module } from '@nestjs/common';
import { UserModule } from '../User/User.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './Auth.controller';

import { LoginAuthUseCase } from './application/queries/login-Auth.usecase';
import { JwtStrategy } from './application/queries/jwt.strategy';
@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      global: true,
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: process.env.JWT_EXPIRATION },
      })
    })
  ],
  providers: [ LoginAuthUseCase,JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
