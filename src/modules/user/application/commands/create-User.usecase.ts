import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  USER_REPOSITORY,
  type IUserRepository,
} from '../../domain/user.repository';
import { User } from '../../domain/user.entity';
import { CreateUserDto } from '../../dto/create-User.dto';
import { hashPassword } from 'src/shared/utils/bcrypt.util';
import { SendEmailUserUseCase } from 'src/modules/mail/application/sendMail-User.usecase';
import { Role } from 'src/modules/role/domain/role.entity';
import { Permission } from 'src/modules/permission/domain/permission.entity';
import { GetOneRoleUseCase } from 'src/modules/role/application/queries/getOne-Role.usecase';
import { GetOnePermissionUseCase } from 'src/modules/permission/application/queries/getOne-Permission.usecase';
import { GetByEmailUserUseCase } from '../queries/getByEmail-User.usecase';
import { GetByNameRoleUseCase } from 'src/modules/role/application/queries/getByName-Role.usecase';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepo: IUserRepository,
    private readonly sendEmailUserUseCase: SendEmailUserUseCase,
    private readonly getOneRole: GetOneRoleUseCase,
    private readonly getOnePermission: GetOnePermissionUseCase,
    private readonly getOyEmailUser: GetByEmailUserUseCase,
    private readonly getByNameRole: GetByNameRoleUseCase,
  ) {}

  private async findRoles(ids: number[]): Promise<Role[]> {
    return Promise.all(ids.map((id) => this.getOneRole.execute(id)));
  }

  private async findPermissions(ids: number[]): Promise<Permission[]> {
    return Promise.all(ids.map((id) => this.getOnePermission.execute(id)));
  }
  private async getDefaultRole(): Promise<Role> {
    return this.getByNameRole.execute('user');
  }
  async execute(dto: CreateUserDto): Promise<User> {
    await this.getOyEmailUser.execute(dto.email);
    const [roles, permission, hashedPassword, defaultRole] = await Promise.all([
      this.findRoles(dto.roles),
      this.findPermissions(dto.permissions),
      hashPassword(dto.password),
      this.getDefaultRole(),
    ]);

    const user = new User({
      ...dto,
      password: hashedPassword,
      is_verified: dto.is_verified,
      roles: [defaultRole, ...roles],
      permission,
    });

    if (dto.is_verified === false) {
      await this.sendEmailUserUseCase.create({
        email: dto.email,
        username: dto.username,
      });
    }

    return this.userRepo.save(user);
  }
}
