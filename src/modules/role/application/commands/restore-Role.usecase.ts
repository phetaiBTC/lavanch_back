import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  ROLE_REPOSITORY,
  type IRoleRepository,
} from '../../domain/role.repository';

@Injectable()
export class RestoreRoleUseCase {
  constructor(
    @Inject(ROLE_REPOSITORY)
    private readonly permissionRepository: IRoleRepository,
  ) {}

  async execute(id: number): Promise<{ message: string }> {
    const role = await this.permissionRepository.findOne(id);
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    return await this.permissionRepository.restore(id);
  }
}
