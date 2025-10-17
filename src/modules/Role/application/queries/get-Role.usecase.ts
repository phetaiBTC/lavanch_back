import { Inject, Injectable } from '@nestjs/common';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { Role_REPOSITORY, type IRoleRepository } from '../../domain/Role.repository';
import { Role } from '../../domain/Role.entity';
import { PaginationDto } from 'src/shared/dto/pagination.dto';

@Injectable()
export class GetRoleUseCase {
  constructor(
    @Inject(Role_REPOSITORY)
    private readonly permissionRepository: IRoleRepository,
  ) {}

  async execute(query: PaginationDto): Promise<PaginatedResponse<Role>> {
    return await this.permissionRepository.findAll(query);
  }
}
