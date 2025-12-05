import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  USER_REPOSITORY,
  type IUserRepository,
} from '../../domain/user.repository';
import { User } from '../../domain/user.entity';
import { UpdateUserDto } from '../../dto/update-User.dto';
import { GetOneRoleUseCase } from 'src/modules/role/application/queries/getOne-Role.usecase';
import { GetOnePermissionUseCase } from 'src/modules/permission/application/queries/getOne-Permission.usecase';
import { Role } from 'src/modules/role/domain/role.entity';
import { Permission } from 'src/modules/permission/domain/permission.entity';
import { GetOneUserUseCase } from '../queries/getOne-User.usecase';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepo: IUserRepository,
    private readonly getOneRole: GetOneRoleUseCase,
    private readonly getOnePermission: GetOnePermissionUseCase,
    private readonly getOneUser: GetOneUserUseCase,
  ) {}

  private async findRoles(ids: number[]): Promise<Role[]> {
    return Promise.all(ids.map((id) => this.getOneRole.execute(id)));
  }

  private async findPermissions(ids: number[]): Promise<Permission[]> {
    return Promise.all(ids.map((id) => this.getOnePermission.execute(id)));
  }

  async execute(id: number, dto: UpdateUserDto): Promise<User> {
    const user = await this.getOneUser.execute(id);
    if (!user) throw new NotFoundException(`User with id ${id} not found`);

    const [roles, permissions] = await Promise.all([
      dto.roles && dto.roles.length ? this.findRoles(dto.roles) : [],
      dto.permissions && dto.permissions.length
        ? this.findPermissions(dto.permissions)
        : [],
    ]);
    const updated: User = user.update({
      ...dto,
      roles: roles,
      permission: permissions,
    });
    return this.userRepo.save(updated);
  }
}
