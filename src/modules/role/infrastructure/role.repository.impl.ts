import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { fetchWithPagination } from 'src/shared/utils/pagination.util';
import { RoleOrm } from 'src/database/typeorm/role.orm-entity';
import { Role } from '../domain/role.entity';
import { RoleMapper } from './role.mapper';
import { IRoleRepository } from '../domain/role.repository';
import { BaseRepository } from 'src/shared/BaseModule/infrastructure/base.repository.impl';
import { RoleResponse } from '../interface/role.interface';

@Injectable()
export class RoleRepositoryImpl
  extends BaseRepository<Role, RoleOrm, RoleResponse>
  implements IRoleRepository
{
  constructor(
    @InjectRepository(RoleOrm)
    private readonly roleRepository: Repository<RoleOrm>,
  ) {
    super({
      repository: roleRepository,
      mapper: RoleMapper,
      searchField: 'role.code',
    });
  }
  override createQueryBuilder(): SelectQueryBuilder<RoleOrm> {
    return this.roleRepository
      .createQueryBuilder('role')
      .leftJoinAndSelect('role.permissions', 'permissions');
  }

  async findByCode(code: string): Promise<Role | null> {
    const role = await this.roleRepository.findOne({
      where: { code },
      relations: ['permissions'],
      withDeleted: true,
    });
    return role ? RoleMapper.toDomain(role) : null;
  }

  async findByName(name: string): Promise<Role | null> {
    const role = await this.roleRepository.findOne({
      where: { code: name },
      relations: ['permissions'],
      withDeleted: true,
    });
    return role ? RoleMapper.toDomain(role) : null;
  }
}
