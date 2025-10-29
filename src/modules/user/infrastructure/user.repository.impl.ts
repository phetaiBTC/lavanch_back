import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserOrm } from 'src/database/typeorm/user.orm-entity';
import { IUserRepository } from '../domain/user.repository';
import { User } from '../domain/user.entity';
import { UserMapper } from './user.mapper';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { BaseRepository } from 'src/shared/BaseModule/infrastructure/base.repository.impl';
import { UserResponse } from '../interface/user.interface';

@Injectable()
export class UserRepositoryImpl
  extends BaseRepository<User, UserOrm, UserResponse>
  implements IUserRepository
{
  constructor(
    @InjectRepository(UserOrm)
    protected readonly repo: Repository<UserOrm>,
  ) {
    super(repo, UserMapper, 'user', 'name');
  }

  async findById(id: number): Promise<User | null> {
    return await super.findById(id, [
      'roles',
      'permissions',
      'roles.permissions',
    ]);
  }

  async findAll(query: PaginationDto): Promise<PaginatedResponse<User>> {
    return super.findAll(query, [
      { relation: 'user.roles', as: 'roles' },
      { relation: 'roles.permissions', as: 'permissions' },
      { relation: 'user.permissions', as: 'user_permissions' },
    ]);
  }

  async findByEmail(email: string): Promise<User | null> {
    const entity = await this.repo.findOne({
      where: { email },
      relations: ['roles', 'permissions', 'roles.permissions'],
      withDeleted: true,
    });
    return entity ? UserMapper.toDomain(entity) : null;
  }
}
