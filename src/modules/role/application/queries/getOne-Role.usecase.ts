import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  ROLE_REPOSITORY,
  type IRoleRepository,
} from '../../domain/role.repository';
import { Role } from '../../domain/role.entity';

@Injectable()
export class GetOneRoleUseCase {
  constructor(
    @Inject(ROLE_REPOSITORY)
    private readonly permissionRepository: IRoleRepository,
  ) {}

  async execute(id: number): Promise<Role> {
    const role = await this.permissionRepository.findById(id);
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    return role;
  }
}
