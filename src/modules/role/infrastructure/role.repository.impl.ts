import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { fetchWithPagination } from 'src/shared/utils/pagination.util';
import { RoleOrm } from 'src/database/typeorm/role.orm-entity';
import { Role } from '../domain/role.entity';
import { RoleMapper } from './role.mapper';
import { IRoleRepository } from '../domain/role.repository';

@Injectable()
export class RoleRepositoryImpl implements IRoleRepository {
  constructor(
    @InjectRepository(RoleOrm)
    private readonly roleRepository: Repository<RoleOrm>,
  ) {}

  async findAll(query: PaginationDto): Promise<PaginatedResponse<Role>> {
    const qb = this.roleRepository
      .createQueryBuilder('role')
      .leftJoinAndSelect('role.permissions', 'permissions');
    return await fetchWithPagination({
      qb,
      page: query.page || 1,
      type: query.type,
      search: {
        kw: query.search,
        field: 'role.code',
      },
      is_active: query.is_active,
      sort: query.sort,
      limit: query.limit || 10,
      toDomain: RoleMapper.toDomain,
    });
  }
  async findOne(id: number): Promise<Role | null> {
    const role = await this.roleRepository.findOne({
      where: { id },
      relations: ['permissions'],
      withDeleted: true,
    });
    return role ? RoleMapper.toDomain(role) : null;
  }
  async findByCode(code: string): Promise<Role | null> {
    const role = await this.roleRepository.findOne({
      where: { code },
      relations: ['permissions'],
      withDeleted: true,
    });
    return role ? RoleMapper.toDomain(role) : null;
  }
  async save(role: Role): Promise<Role> {
    const schema = await this.roleRepository.save(RoleMapper.toSchema(role));
    return RoleMapper.toDomain(schema);
  }
  async hardDelete(id: number): Promise<{ message: string }> {
    await this.roleRepository.delete(id);
    return { message: 'hard delete sussessfully' };
  }
  async softDelete(id: number): Promise<{ message: string }> {
    await this.roleRepository.softDelete(id);
    return { message: 'soft delete sussessfully' };
  }
  async restore(id: number): Promise<{ message: string }> {
    await this.roleRepository.restore(id);
    return { message: 'restore sussessfully' };
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
