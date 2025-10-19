import {
  Inject,
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import {
  ROLE_REPOSITORY,
  type IRoleRepository,
} from '../../domain/role.repository';
import { Role } from '../../domain/role.entity';
import { CreateRoleDto } from '../../dto/create-Role.dto';
import { GetOnePermissionUseCase } from 'src/modules/permission/application/queries/getOne-Permission.usecase';
import { Permission } from 'src/modules/permission/domain/permission.entity';
import { GetOneRoleUseCase } from '../queries/getOne-Role.usecase';

@Injectable()
export class UpdateRoleUseCase {
  constructor(
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepository: IRoleRepository, // ✅ แก้ชื่อให้ตรง
    private readonly getOnePermissionUseCase: GetOnePermissionUseCase,
    private readonly getOneRoleUseCase: GetOneRoleUseCase,
  ) {}

  async execute(roleId: number, body: CreateRoleDto): Promise<Role> {
    const role = await this.getOneRoleUseCase.execute(roleId);
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    if (body.code && body.code !== role.value.code) {
      const exists = await this.roleRepository.findByCode(body.code);
      if (exists) {
        throw new ConflictException('Role code already exists');
      }
    }

    const permissions: Permission[] = [];
    for (const permissionId of body.permissions) {
      const permission =
        await this.getOnePermissionUseCase.execute(permissionId);
      if (!permission) {
        throw new NotFoundException(`Permission ${permissionId} not found`);
      }
      permissions.push(permission);
    }
    const updatedRole = new Role({
      id: role.value.id,
      code: body.code ?? role.value.code,
      permissions:
        permissions.length > 0 ? permissions : role.value.permissions,
    });

    return await this.roleRepository.save(updatedRole);
  }
}
