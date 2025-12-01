import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SendMailUseCase } from 'src/modules/mail/application/send-mail.usecase';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class SendEmailUserUseCase {
  constructor(
    private readonly configService: ConfigService,
    private readonly sendMailUseCase: SendMailUseCase,
    private readonly jwtService: JwtService,
  ) {}
  async create(user: { email: string; username: string }) {
    const emailToken = this.jwtService.sign(
      {
        email: user.email,
      },
      {
        expiresIn: '5m',
      },
    );
    await this.sendMailUseCase.execute(
      user.email,
      'Welcome to our system 🎉',
      'welcome',
      {
        username: user.username,
        verifyLink: `${this.configService.getOrThrow('FRONTEND_URL')}/verify?token=${emailToken}`,
      },
    );
    return { message: 'Email sent' };
  }
  async reset(email: string) {
    const emailToken = this.jwtService.sign(
      {
        email,
      },
      {
        expiresIn: '5m',
      },
    );
    await this.sendMailUseCase.execute(
      email,
      'Reset Password',
      'resetPassword',
      {
        verifyLink: `${this.configService.getOrThrow('FRONTEND_URL')}/auth/reset-password?token=${emailToken}`,
      },
    );
    return { message: 'Email sent' };
  }
}
