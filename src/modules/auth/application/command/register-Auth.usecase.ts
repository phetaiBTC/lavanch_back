import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  USER_REPOSITORY,
  type IUserRepository,
} from 'src/modules/user/domain/user.repository';
// import { CreateUserDto } from '../../dto/create-User.dto';
import { hashPassword } from 'src/shared/utils/bcrypt.util';
import { SendEmailUserUseCase } from 'src/modules/mail/application/sendMail-User.usecase';
import { RegisterUserDto } from 'src/modules/auth/dto/register-Auth.dto';
import { User } from 'src/modules/user/domain/user.entity';
// import { GetOneRoleUseCase } from 'src/modules/role/application/queries/getOne-Role.usecase';
import { Role } from 'src/modules/role/domain/role.entity';
import { GetByNameRoleUseCase } from 'src/modules/role/application/queries/getByName-Role.usecase';
@Injectable()
export class RegisterUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepo: IUserRepository,
    private readonly sendEmailUserUseCase: SendEmailUserUseCase,
    private readonly getByNameRoleUseCase: GetByNameRoleUseCase,
  ) {}
  async findRoles(): Promise<Role> {
    return this.getByNameRoleUseCase.execute('user');
  }
  async execute(dto: RegisterUserDto): Promise<User> {
    if (dto.password != dto.confirm_password)
      throw new BadRequestException('Passwords do not match');
    const userExists = await this.userRepo.findByEmail(dto.email);
    if (userExists) throw new BadRequestException('User already exists');
    const user = new User({
      ...dto,
      is_verified: false,
      password: await hashPassword(dto.password),
      roles: [await this.findRoles()],
    });
    await this.sendEmailUserUseCase.create({
      email: dto.email,
      username: dto.username,
    });
    return this.userRepo.save(user);
  }
}
