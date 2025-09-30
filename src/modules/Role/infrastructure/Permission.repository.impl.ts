import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { fetchWithPagination } from 'src/shared/utils/pagination.util';
import { RoleOrm } from 'src/database/typeorm/role.orm-entity';
import { Role } from '../domain/Role.entity';
import { RoleMapper } from './Role.mapper';
import { IRoleRepository } from '../domain/Role.repository';

@Injectable()
export class RoleRepositoryImpl implements IRoleRepository {
  constructor(
    @InjectRepository(RoleOrm)
    private readonly roleRepository: Repository<RoleOrm>,
  ) {}

  async findAll(query: PaginationDto): Promise<PaginatedResponse<Role>> {
    const qb = this.roleRepository.createQueryBuilder('role').leftJoinAndSelect('role.permissions', 'permissions');
    return await fetchWithPagination({
      qb,
      page: query.page || 1,
      type: query.type,
      search: {
        kw: query.search,
        field: 'code',
      },
      is_active: query.is_active,
      sort: query.sort,
      limit: query.limit || 10,
      toDomain: RoleMapper.toDomain,
    });
  }
}
