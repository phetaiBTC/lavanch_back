import { Inject, Injectable } from '@nestjs/common';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import {
  ROLE_REPOSITORY,
  type IRoleRepository,
} from '../../domain/role.repository';
import { Role } from '../../domain/role.entity';
import { PaginationDto } from 'src/shared/dto/pagination.dto';

@Injectable()
export class GetRoleUseCase {
  constructor(
    @Inject(ROLE_REPOSITORY)
    private readonly permissionRepository: IRoleRepository,
  ) {}

  async execute(query: PaginationDto): Promise<PaginatedResponse<Role>> {
    return await this.permissionRepository.findAll(query);
  }
}
