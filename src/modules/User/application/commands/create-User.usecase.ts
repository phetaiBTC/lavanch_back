import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  User_REPOSITORY,
  type IUserRepository,
} from '../../domain/User.repository';
import { User } from '../../domain/User.entity';
import { CreateUserDto } from '../../dto/create-User.dto';
import { hashPassword } from 'src/shared/utils/bcrypt.util';
import { SendMailUseCase } from 'src/modules/mail/application/send-mail.usecase';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(User_REPOSITORY) private readonly userRepo: IUserRepository,
    private readonly sendMailUseCase: SendMailUseCase,
    private readonly jwtService: JwtService,
  ) {}

  async execute(dto: CreateUserDto): Promise<User> {
    const userExists = await this.userRepo.findByEmail(dto.email);
    if (userExists) throw new BadRequestException('User already exists');
    const user = new User({
      ...dto,
      is_verified: false,
      password: await hashPassword(dto.password),
    });
    const emailToken = this.jwtService.sign({
      email: dto.email,
    });
    await this.sendMailUseCase.execute(
      user.value.email,
      'Welcome to our system 🎉',
      'welcome',
      {
        username: user.value.username,
        verifyLink: `https://example.com/verify?token=xxxx?token=${emailToken}`,
      },
    );

    return this.userRepo.create(user);
  }
}
