import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  USER_REPOSITORY,
  type IUserRepository,
} from '../../domain/user.repository';
import { User } from '../../domain/user.entity';
import { CreateUserDto } from '../../dto/create-User.dto';
import { hashPassword } from 'src/shared/utils/bcrypt.util';
import { SendEmailUserUseCase } from 'src/modules/mail/application/sendMail-User.usecase';
@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepo: IUserRepository,
    private readonly sendEmailUserUseCase: SendEmailUserUseCase,
  ) {}

  async execute(dto: CreateUserDto): Promise<User> {
    if (dto.password != dto.confirm_password)
      throw new BadRequestException('Passwords do not match');
    const userExists = await this.userRepo.findByEmail(dto.email);
    if (userExists) throw new BadRequestException('User already exists');
    const user = new User({
      ...dto,
      is_verified: false,
      password: await hashPassword(dto.password),
    });
    await this.sendEmailUserUseCase.create({
      email: dto.email,
      username: dto.username,
    });
    return this.userRepo.save(user);
  }
}
