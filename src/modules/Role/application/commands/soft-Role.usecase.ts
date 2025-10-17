import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  Role_REPOSITORY,
  type IRoleRepository,
} from '../../domain/Role.repository';

@Injectable()
export class SoftDeleteRoleUseCase {
  constructor(
    @Inject(Role_REPOSITORY)
    private readonly permissionRepository: IRoleRepository,
  ) {}

  async execute(id: number): Promise<{ message: string }> {
    const role = await this.permissionRepository.findOne(id);
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    return await this.permissionRepository.softDelete(id);
  }
}
