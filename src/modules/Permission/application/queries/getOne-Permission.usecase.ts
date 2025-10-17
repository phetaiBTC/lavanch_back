import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  type IPermissionRepository,
  Permission_REPOSITORY,
} from '../../domain/Permission.repository';
import { Permission } from '../../domain/Permission.entity';

@Injectable()
export class GetOnePermissionUseCase {
  constructor(
    @Inject(Permission_REPOSITORY)
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
