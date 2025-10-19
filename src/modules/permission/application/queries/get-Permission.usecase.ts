import { Inject, Injectable } from '@nestjs/common';
import {
  type IPermissionRepository,
  PERMISSION_REPOSITORY,
} from '../../domain/permission.repository';
import { Permission } from '../../domain/permission.entity';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { PaginationDto } from 'src/shared/dto/pagination.dto';

@Injectable()
export class GetPermissionUseCase {
  constructor(
    @Inject(PERMISSION_REPOSITORY)
    private readonly permissionRepository: IPermissionRepository,
  ) {}

  async execute(query: PaginationDto): Promise<PaginatedResponse<Permission>> {
    return await this.permissionRepository.findAll(query);
  }
}
