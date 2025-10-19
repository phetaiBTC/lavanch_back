import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  type IPermissionRepository,
  PERMISSION_REPOSITORY,
} from '../../domain/permission.repository';
import { Permission } from '../../domain/permission.entity';

@Injectable()
export class GetOnePermissionUseCase {
  constructor(
    @Inject(PERMISSION_REPOSITORY)
    private readonly permissionRepository: IPermissionRepository,
  ) {}

  async execute(id: number): Promise<Permission> {
    const permission = await this.permissionRepository.findOne(id);
    if (!permission) {
      throw new NotFoundException('Permission not found');
    }
    return permission;
  }
}
