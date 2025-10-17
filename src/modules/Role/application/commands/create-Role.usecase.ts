import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  Role_REPOSITORY,
  type IRoleRepository,
} from '../../domain/Role.repository';
import { Role } from '../../domain/Role.entity';
import { CreateRoleDto } from '../../dto/create-Role.dto';
import { GetOnePermissionUseCase } from 'src/modules/Permission/application/queries/getOne-Permission.usecase';
import { Permission } from 'src/modules/Permission/domain/Permission.entity';

@Injectable()
export class CreateRoleUseCase {
  constructor(
    @Inject(Role_REPOSITORY)
    private readonly permissionRepository: IRoleRepository,
    private readonly getOnePermissionUseCase: GetOnePermissionUseCase,
  ) {}

  async execute(body: CreateRoleDto): Promise<Role> {
    const exists = await this.permissionRepository.findByCode(body.code);
    if (exists) {
      throw new NotFoundException('Role already exists');
    }
    const permissions: Permission[] = [];

    for (const id of body.permissions) {
      const permission = await this.getOnePermissionUseCase.execute(id);
      if (!permission) {
        throw new NotFoundException('Permission not found');
      }
      permissions.push(permission);
    }

    const role = new Role({
      code: body.code,
      permissions,
    });
    console.log(role.value);
    return await this.permissionRepository.save(role);
  }
}
