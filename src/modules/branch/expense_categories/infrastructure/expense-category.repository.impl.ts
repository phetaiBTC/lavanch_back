import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ExpenseCategoriesOrm } from 'src/database/typeorm/expense_categories.orm-entity';
import { IExpenseCategoryRepository } from '../domain/expense-category.repository';
import { ExpenseCategory } from '../domain/expense-category.entity';
import { ExpenseCategoryMapper } from './expense-category.mapper';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { fetchWithPagination } from 'src/shared/utils/pagination.util';

@Injectable()
export class ExpenseCategoryRepositoryImpl
  implements IExpenseCategoryRepository
{
  constructor(
    @InjectRepository(ExpenseCategoriesOrm)
    private readonly categoryRepo: Repository<ExpenseCategoriesOrm>,
  ) {}

  async findAll(
    query: PaginationDto,
  ): Promise<PaginatedResponse<ExpenseCategory>> {
    const qb = this.categoryRepo
      .createQueryBuilder('expense_categories')
      .withDeleted();
    return await fetchWithPagination({
      qb,
      page: query.page || 1,
      type: query.type,
      search: { kw: query.search, field: 'name' },
      is_active: query.is_active,
      sort: query.sort,
      limit: query.limit || 10,
      toDomain: ExpenseCategoryMapper.toDomain,
    });
  }

  async findById(id: number): Promise<ExpenseCategory | null> {
    const entity = await this.categoryRepo.findOne({ where: { id } });
    return entity ? ExpenseCategoryMapper.toDomain(entity) : null;
  }

  async findByCode(code: string): Promise<ExpenseCategory | null> {
    const entity = await this.categoryRepo.findOne({ where: { code } });
    return entity ? ExpenseCategoryMapper.toDomain(entity) : null;
  }

  async create(category: ExpenseCategory): Promise<ExpenseCategory> {
    const entity = this.categoryRepo.create(
      ExpenseCategoryMapper.toSchema(category),
    );
    const saved = await this.categoryRepo.save(entity);
    return ExpenseCategoryMapper.toDomain(saved);
  }

  async update(category: ExpenseCategory): Promise<ExpenseCategory> {
    const saved = await this.categoryRepo.save(
      ExpenseCategoryMapper.toSchema(category),
    );
    return ExpenseCategoryMapper.toDomain(saved);
  }

  async hardDelete(id: number): Promise<{ message: string }> {
    await this.categoryRepo.delete(id);
    return { message: 'hard delete successfully' };
  }

  async softDelete(id: number): Promise<{ message: string }> {
    // Set is_active to false before soft deleting
    await this.categoryRepo.update(id, { is_active: false });
    await this.categoryRepo.softDelete(id);
    return { message: 'soft delete successfully' };
  }

  async restore(id: number): Promise<{ message: string }> {
    await this.categoryRepo.restore(id);
    // Set is_active to true after restoring
    await this.categoryRepo.update(id, { is_active: true });
    return { message: 'restore successfully' };
  }

  async deleteMultiple(ids: number[]): Promise<void> {
    // Set is_active to false before soft deleting
    await this.categoryRepo.update(ids, { is_active: false });
    await this.categoryRepo.softDelete(ids);
  }
}
