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
    console.log('FindExpenseCategoryDto query:', {
      deleted: query.deleted,
      deletedType: typeof query.deleted,
      status: query.status,
      search: query.search,
    });

    // Search by name or code
    if (query.search) {
      qb.andWhere(
        '(expense_categories.name LIKE :kw OR expense_categories.code LIKE :kw)',
        {
          kw: `%${query.search}%`,
        },
      );
    }

    // Handle deleted filter first (takes priority)
    if (query.deleted === true) {
      // Show only soft-deleted items
      console.log('Applying deleted=true filter');
      qb.withDeleted();
      qb.andWhere('expense_categories.deletedAt IS NOT NULL');
    } else if (query.deleted === false) {
      // Show only active items (not deleted)
      console.log('Applying deleted=false filter');
      qb.andWhere('expense_categories.deletedAt IS NULL');
    } else {
      console.log('No deleted filter, showing all');
    }
    // If deleted is undefined, show all (no filter on deletedAt)

    // Apply status filter ONLY if deleted filter is not set
    // status filters is_active field (active/inactive) for non-deleted records
    if (query.deleted === undefined && query.status) {
      if (query.status === ActiveStatus.ACTIVE) {
        qb.andWhere('expense_categories.is_active = true');
      } else if (query.status === ActiveStatus.INACTIVE) {
        qb.andWhere('expense_categories.is_active = false');
      }
      // status === ALL -> no condition
    }

    // Sorting
    qb.orderBy('expense_categories.createdAt', query.sort || 'DESC');

    // Pagination
    const skip = ((query.page || 1) - 1) * (query.limit || 10);

    const [entities, total] = await qb
      .skip(skip)
      .take(query.limit || 10)
      .getManyAndCount();

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
