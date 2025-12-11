import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ExpenseCategoriesOrm } from 'src/database/typeorm/expense_categories.orm-entity';
import { IExpenseCategoryRepository } from '../domain/expense-category.repository';
import { ExpenseCategory } from '../domain/expense-category.entity';
import { ExpenseCategoryMapper } from './expense-category.mapper';
import { FindExpenseCategoryDto } from '../dto/find-expense-category.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { ActiveStatus } from 'src/shared/dto/pagination.dto';

@Injectable()
export class ExpenseCategoryRepositoryImpl
  implements IExpenseCategoryRepository
{
  constructor(
    @InjectRepository(ExpenseCategoriesOrm)
    private readonly categoryRepo: Repository<ExpenseCategoriesOrm>,
  ) {}

  async findAll(
    query: FindExpenseCategoryDto,
  ): Promise<PaginatedResponse<ExpenseCategory>> {
    const qb = this.categoryRepo.createQueryBuilder('expense_categories');

    // Debug logging
    console.log('\n=== FindExpenseCategoryDto query ===');
    console.log(
      'deleted:',
      query.deleted,
      '(type:',
      typeof query.deleted + ')',
    );
    console.log('status:', query.status);
    console.log('search:', query.search);
    console.log('====================================\n');

    // Search by name or code
    if (query.search) {
      qb.andWhere(
        '(expense_categories.name LIKE :kw OR expense_categories.code LIKE :kw)',
        {
          kw: `%${query.search}%`,
        },
      );
    }

    // FILTER 1: Handle deletedAt (soft-delete) filter
    if (query.deleted === 'true') {
      // Show only soft-deleted items (deletedAt IS NOT NULL)
      console.log('✅ Applying: deletedAt IS NOT NULL (soft-deleted records)');
      qb.withDeleted();
      qb.andWhere('expense_categories.deletedAt IS NOT NULL');
    } else if (query.deleted === 'false') {
      // Show only non-deleted items (deletedAt IS NULL)
      console.log('✅ Applying: deletedAt IS NULL (active records)');
      qb.andWhere('expense_categories.deletedAt IS NULL');
    } else {
      console.log('ℹ️  No deletedAt filter - showing all records');
    }

    // FILTER 2: Handle is_active (status) filter - INDEPENDENT of deleted filter
    if (query.status) {
      if (query.status === ActiveStatus.ACTIVE) {
        console.log('✅ Applying: is_active = true');
        qb.andWhere('expense_categories.is_active = true');
      } else if (query.status === ActiveStatus.INACTIVE) {
        console.log('✅ Applying: is_active = false');
        qb.andWhere('expense_categories.is_active = false');
      } else if (query.status === ActiveStatus.ALL) {
        console.log('ℹ️  Status = ALL - no is_active filter');
      }
    } else {
      console.log('ℹ️  No is_active filter');
    }

    // Sorting
    qb.orderBy('expense_categories.createdAt', query.sort || 'DESC');

    // Pagination
    const skip = ((query.page || 1) - 1) * (query.limit || 10);

    // Debug: Print the SQL query
    const sqlQuery = qb.getSql();
    console.log('Generated SQL:', sqlQuery);
    console.log('Query parameters:', qb.getParameters());

    const [entities, total] = await qb
      .skip(skip)
      .take(query.limit || 10)
      .getManyAndCount();

    console.log('Found entities:', entities.length, 'Total:', total);

    return {
      data: entities.map((e) => ExpenseCategoryMapper.toDomain(e)),
      pagination: {
        total,
        count: entities.length,
        limit: query.limit || 10,
        totalPages: Math.ceil(total / (query.limit || 10)) || 1,
        currentPage: query.page || 1,
      },
    };
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
