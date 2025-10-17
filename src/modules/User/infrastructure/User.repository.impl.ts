import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserOrm } from 'src/database/typeorm/user.orm-entity';
import { IUserRepository } from '../domain/User.repository';
import { User } from '../domain/User.entity';
import { UserMapper } from './User.mapper';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { fetchWithPagination } from 'src/shared/utils/pagination.util';

@Injectable()
export class UserRepositoryImpl implements IUserRepository {
  constructor(
    @InjectRepository(UserOrm)
    private readonly repo: Repository<UserOrm>,
  ) {}

  async findById(id: number): Promise<User | null> {
    const entity = await this.repo.findOne({
      where: { id },
      withDeleted: true,
      relations: ['roles', 'permissions', 'roles.permissions'],
    });
    return entity ? UserMapper.toDomain(entity) : null;
  }

  async findAll(query: PaginationDto): Promise<PaginatedResponse<User>> {
    const qb = this.repo
      .createQueryBuilder('user')
      .withDeleted()
      .leftJoinAndSelect('user.roles', 'roles')
      .leftJoinAndSelect('roles.permissions', 'permissions')
      .leftJoinAndSelect('user.permissions', 'user_permissions');
    return await fetchWithPagination({
      qb,
      page: query.page || 1,
      type: query.type,
      search: {
        kw: query.search,
        field: 'name',
      },
      is_active: query.is_active,
      sort: query.sort,
      limit: query.limit || 10,
      toDomain: UserMapper.toDomain,
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const entity = await this.repo.findOne({
      where: { email },
      relations: ['roles', 'permissions', 'roles.permissions'],
      withDeleted: true,
    });
    return entity ? UserMapper.toDomain(entity) : null;
  }

  async create(user: User): Promise<User> {
    const entity = this.repo.create(UserMapper.toSchema(user));
    const saved = await this.repo.save(entity);
    return UserMapper.toDomain(saved);
  }

  async update(user: User): Promise<User> {
    const saved = await this.repo.save(UserMapper.toSchema(user));
    return UserMapper.toDomain(saved);
  }

  async hardDelete(id: number): Promise<{ message: string }> {
    await this.repo.delete(id);
    return { message: 'hard delete sussessfully' };
  }
  async softDelete(id: number): Promise<{ message: string }> {
    await this.repo.softDelete(id);
    return { message: 'soft delete sussessfully' };
  }
  async restore(id: number): Promise<{ message: string }> {
    await this.repo.restore(id);
    return { message: 'restore sussessfully' };
  }
}
