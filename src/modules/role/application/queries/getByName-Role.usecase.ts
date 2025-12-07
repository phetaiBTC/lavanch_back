import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  ROLE_REPOSITORY,
  type IRoleRepository,
} from '../../domain/role.repository';
import { Role } from '../../domain/role.entity';

@Injectable()
export class GetByNameRoleUseCase {
  constructor(
    @Inject(ROLE_REPOSITORY)
    private readonly permissionRepository: IRoleRepository,
  ) {}

  async execute(name: string): Promise<Role> {
    const role = await this.permissionRepository.findByName(name);
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    return role;
  }
}
