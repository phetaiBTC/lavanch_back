import { Injectable } from '@nestjs/common';
import { IPermissionRepository } from '../domain/Permission.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionOrm } from 'src/database/typeorm/permission.orm-entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { Permission } from '../domain/Permission.entity';
import { fetchWithPagination } from 'src/shared/utils/pagination.util';
import { PermissionMapper } from './Permission.mapper';

@Injectable()
export class PermissionRepositoryImpl implements IPermissionRepository {
  constructor(
    @InjectRepository(PermissionOrm)
    private readonly permissionRepository: Repository<PermissionOrm>,
  ) {}

  async findAll(query: PaginationDto): Promise<PaginatedResponse<Permission>> {
    const qb = this.permissionRepository.createQueryBuilder('permission');
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
      toDomain: PermissionMapper.toDomain,
    });
  }
}
