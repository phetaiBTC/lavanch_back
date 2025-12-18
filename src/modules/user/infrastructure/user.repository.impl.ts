import { Injectable } from '@nestjs/common';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserOrm } from 'src/database/typeorm/user.orm-entity';
import { IUserRepository } from '../domain/user.repository';
import { User } from '../domain/user.entity';
import { UserMapper } from './user.mapper';
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
    super({
      repository: repo,
      mapper: UserMapper,
      searchField: 'user.email',
    });
  }
  override createQueryBuilder(): SelectQueryBuilder<UserOrm> {
    return this.repo
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'roles')
      .leftJoinAndSelect('user.permissions', 'permissions')
      .leftJoinAndSelect('roles.permissions', 'role_permissions');
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
