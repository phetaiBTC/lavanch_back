import { Inject, Injectable } from '@nestjs/common';
import {
  type IPermissionRepository,
  Permission_REPOSITORY,
} from '../../domain/Permission.repository';
import { Permission } from '../../domain/Permission.entity';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';

@Injectable()
export class GetPermissionUseCase {
  constructor(
    @Inject(Permission_REPOSITORY)
    private readonly permissionRepository: IPermissionRepository,
  ) {}

  async execute(query: any): Promise<PaginatedResponse<Permission>> {
    return await this.permissionRepository.findAll(query);
  }
}
