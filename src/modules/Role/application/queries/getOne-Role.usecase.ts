import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Role_REPOSITORY, type IRoleRepository } from '../../domain/Role.repository';
import { Role } from '../../domain/Role.entity';

@Injectable()
export class GetOneRoleUseCase {
  constructor(
    @Inject(Role_REPOSITORY)
    private readonly permissionRepository: IRoleRepository,
  ) {}

  async execute(id:number): Promise<Role> {
    const role = await this.permissionRepository.findOne(id);
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    return role
  }
}
