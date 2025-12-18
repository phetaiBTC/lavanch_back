import { Injectable } from '@nestjs/common';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ICategoryRepository } from '../domain/category.repository';
import { Category } from '../domain/category.entity';
import { CategoryMapper } from './category.mapper';
import { CategoryOrm } from 'src/database/typeorm/category.orm-entity';
import { BaseRepository } from 'src/shared/BaseModule/infrastructure/base.repository.impl';

@Injectable()
export class CategoryRepositoryImpl
  extends BaseRepository<Category, CategoryOrm, any>
  implements ICategoryRepository
{
  constructor(
    @InjectRepository(CategoryOrm)
    protected readonly categoryRepo: Repository<CategoryOrm>,
  ) {
    super({
      repository: categoryRepo,
      mapper: CategoryMapper,
      searchField: 'name',
    });
  }
  override createQueryBuilder(): SelectQueryBuilder<CategoryOrm> {
    return this.categoryRepo.createQueryBuilder('category');
  }
  async findByName(name: string): Promise<Category | null> {
    return this.findByField('name', name);
  }
}
