import { Injectable } from '@nestjs/common';
import { IPermissionRepository } from '../domain/permission.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionOrm } from 'src/database/typeorm/permission.orm-entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { Permission } from '../domain/permission.entity';
import { fetchWithPagination } from 'src/shared/utils/pagination.util';
import { PermissionMapper } from './permission.mapper';

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

  async findOne(id: number): Promise<Permission | null> {
    const permission = await this.permissionRepository.findOneBy({ id });
    return permission ? PermissionMapper.toDomain(permission) : null;
  }
}
