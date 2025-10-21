// import { Injectable } from '@nestjs/common';
// import { Repository } from 'typeorm';
// import { InjectRepository } from '@nestjs/typeorm';
// import { ICategoryRepository } from '../domain/category.repository';
// import { Category } from '../domain/category.entity';
// import { CategoryMapper } from './category.mapper';
// import { PaginationDto } from 'src/shared/dto/pagination.dto';
// import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
// import { fetchWithPagination } from 'src/shared/utils/pagination.util';
// import { CategoryOrm } from 'src/database/typeorm/category.orm-entity';
// @Injectable()
// export class CategoryRepositoryImpl implements ICategoryRepository {
//   constructor(
//     @InjectRepository(CategoryOrm)
//     private readonly categoryRepo: Repository<CategoryOrm>,
//   ) {}

//   async findAll(query: PaginationDto): Promise<PaginatedResponse<Category>> {
//     const qb = this.categoryRepo
//       .createQueryBuilder('category')
//       .leftJoinAndSelect('category.parent', 'parent')
//       .leftJoinAndSelect('category.children', 'children')
//       .withDeleted();
//     console.log(query);
//     return await fetchWithPagination({
//       qb,
//       page: query.page || 1,
//       type: query.type,
//       search: { kw: query.search, field: 'name' },
//       is_active: query.is_active,
//       sort: query.sort,
//       limit: query.limit || 10,
//       toDomain: CategoryMapper.toDomain.bind(CategoryMapper),
//     });
//   }
//   async findById(id: number): Promise<Category | null> {
//     const categoryEntity = await this.categoryRepo
//       .createQueryBuilder('category')
//       .leftJoinAndSelect('category.parent', 'parent')
//       .leftJoinAndSelect('category.children', 'children')
//       .withDeleted()
//       .where('category.id = :id', { id })
//       .getOne();
//     return categoryEntity ? CategoryMapper.toDomain(categoryEntity) : null;
//   }
//   async create(category: Category): Promise<Category> {
//     const entity = this.categoryRepo.create(CategoryMapper.toSchema(category));
//     const saved = await this.categoryRepo.save(entity);
//     return CategoryMapper.toDomain(saved);
//   }
//   async update(category: Category): Promise<Category> {
//     const saved = await this.categoryRepo.save(
//       CategoryMapper.toSchema(category),
//     );
//     return CategoryMapper.toDomain(saved);
//   }
//   async hardDelete(id: number): Promise<{ message: string }> {
//     await this.categoryRepo.delete(id);
//     return { message: 'hard delete sussessfully' };
//   }
//   async softDelete(id: number): Promise<{ message: string }> {
//     await this.categoryRepo.softDelete(id);
//     return { message: 'soft delete sussessfully' };
//   }
//   async restore(id: number): Promise<{ message: string }> {
//     await this.categoryRepo.restore(id);
//     return { message: 'restore sussessfully' };
//   }
//   async findByName(name: string): Promise<Category | null> {
//     const category = await this.categoryRepo.findOne({ where: { name } });
//     return category ? CategoryMapper.toDomain(category) : null;
//   }
// }

import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ICategoryRepository } from '../domain/category.repository';
import { Category } from '../domain/category.entity';
import { CategoryMapper } from './category.mapper';
import { CategoryOrm } from 'src/database/typeorm/category.orm-entity';
import { BaseRepository } from 'src/shared/ฺRepository/BaseRepository';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';

@Injectable()
export class CategoryRepositoryImpl
  extends BaseRepository<Category, CategoryOrm, any>
  implements ICategoryRepository
{
  constructor(
    @InjectRepository(CategoryOrm)
    private readonly categoryRepo: Repository<CategoryOrm>,
  ) {
    super(categoryRepo, CategoryMapper, 'category', 'name');
  }
  async findAll(query: PaginationDto) {
    return super.findAll(query, [
      {
        relation: 'category.children',
        as: 'children',
      },
      {
        relation: 'category.parent',
        as: 'parent',
      },
    ]);
  }
  async findByName(name: string): Promise<Category | null> {
    return this.findByField('name', name);
  }
}
