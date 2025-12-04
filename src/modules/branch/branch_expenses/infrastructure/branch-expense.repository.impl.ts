import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BranchExpensesOrm } from 'src/database/typeorm/branch_expenses.orm-entity';
import { IBranchExpenseRepository, SummaryResponse } from '../domain/branch-expense.repository';
import { BranchExpense } from '../domain/branch-expense.entity';
import { BranchExpenseMapper } from './branch-expense.mapper';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { fetchWithPagination } from 'src/shared/utils/pagination.util';
import { FindBranchExpenseDto, ExpenseStatusFilter } from '../dto/find-branch-expense.dto';

@Injectable()
export class BranchExpenseRepositoryImpl implements IBranchExpenseRepository {
  constructor(
    @InjectRepository(BranchExpensesOrm)
    private readonly expenseRepo: Repository<BranchExpensesOrm>,
  ) {}

  async findAll(
    query: FindBranchExpenseDto,
  ): Promise<PaginatedResponse<BranchExpense>> {
    const qb = this.expenseRepo
      .createQueryBuilder('branch_expenses')
      .withDeleted()
      .leftJoinAndSelect('branch_expenses.branch', 'branch')
      .leftJoinAndSelect('branch_expenses.expense_category', 'category')
      .leftJoinAndSelect('branch_expenses.creator', 'creator');

    // Status filter
    if (query.expenseStatus && query.expenseStatus !== ExpenseStatusFilter.ALL) {
      qb.andWhere('branch_expenses.status = :status', { status: query.expenseStatus });
    }

    // Branch filter (by ID or name)
    if (query.branchId) {
      qb.andWhere('branch_expenses.branch_id = :branchId', { branchId: query.branchId });
    }
    if (query.branchName) {
      qb.andWhere('LOWER(branch.name) LIKE LOWER(:branchName)', { 
        branchName: `%${query.branchName}%` 
      });
    }

    // Expense Category filter (by ID or name)
    if (query.expenseCategoryId) {
      qb.andWhere('branch_expenses.expense_category_id = :categoryId', { 
        categoryId: query.expenseCategoryId 
      });
    }
    if (query.expenseCategoryName) {
      qb.andWhere('LOWER(category.name) LIKE LOWER(:categoryName)', { 
        categoryName: `%${query.expenseCategoryName}%` 
      });
    }

    // Date range filter
    if (query.createdFrom) {
      qb.andWhere('branch_expenses.createdAt >= :createdFrom', { 
        createdFrom: query.createdFrom 
      });
    }
    if (query.createdTo) {
      qb.andWhere('branch_expenses.createdAt <= :createdTo', { 
        createdTo: query.createdTo 
      });
    }

    // Search in both expense_no and branch name
    if (query.search) {
      qb.andWhere(
        '(branch_expenses.expense_no LIKE :search OR LOWER(branch.name) LIKE LOWER(:search))',
        { search: `%${query.search}%` }
      );
    }

    return await fetchWithPagination({
      qb,
      page: query.page || 1,
      type: query.type,
      search: undefined, // Already handled above
      is_active: query.is_active,
      sort: query.sort,
      limit: query.limit || 10,
      toDomain: BranchExpenseMapper.toDomain,
    });
  }

  async findByBranch(
    branchId: number,
    query: PaginationDto,
  ): Promise<PaginatedResponse<BranchExpense>> {
    const qb = this.expenseRepo
      .createQueryBuilder('branch_expenses')
      .withDeleted()
      .leftJoinAndSelect('branch_expenses.branch', 'branch')
      .leftJoinAndSelect('branch_expenses.expense_category', 'category')
      .where('branch_expenses.branch_id = :branchId', { branchId });

    return await fetchWithPagination({
      qb,
      page: query.page || 1,
      type: query.type,
      search: { kw: query.search, field: 'branch_expenses.expense_no' },
      is_active: query.is_active,
      sort: query.sort,
      limit: query.limit || 10,
      toDomain: BranchExpenseMapper.toDomain,
    });
  }

  async findById(id: number): Promise<BranchExpense | null> {
    const entity = await this.expenseRepo.findOne({
      where: { id },
      relations: ['branch', 'expense_category', 'creator', 'approver'],
    });
    return entity ? BranchExpenseMapper.toDomain(entity) : null;
  }

  async findByExpenseNo(expenseNo: string): Promise<BranchExpense | null> {
    const entity = await this.expenseRepo.findOne({
      where: { expense_no: expenseNo },
    });
    return entity ? BranchExpenseMapper.toDomain(entity) : null;
  }

  async generateExpenseNo(): Promise<string> {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const prefix = `EXP${year}${month}`;

    const lastExpense = await this.expenseRepo
      .createQueryBuilder('expense')
      .where('expense.expense_no LIKE :prefix', { prefix: `${prefix}%` })
      .orderBy('expense.expense_no', 'DESC')
      .getOne();

    if (!lastExpense) {
      return `${prefix}0001`;
    }

    const lastNumber = parseInt(lastExpense.expense_no.slice(-4));
    const nextNumber = String(lastNumber + 1).padStart(4, '0');
    return `${prefix}${nextNumber}`;
  }

  async create(expense: BranchExpense): Promise<BranchExpense> {
    const entity = this.expenseRepo.create(
      BranchExpenseMapper.toSchema(expense),
    );
    const saved = await this.expenseRepo.save(entity);
    return BranchExpenseMapper.toDomain(saved);
  }

  async update(expense: BranchExpense): Promise<BranchExpense> {
    const saved = await this.expenseRepo.save(
      BranchExpenseMapper.toSchema(expense),
    );
    return BranchExpenseMapper.toDomain(saved);
  }

  async hardDelete(id: number): Promise<{ message: string }> {
    await this.expenseRepo.delete(id);
    return { message: 'hard delete successfully' };
  }

  async softDelete(id: number): Promise<{ message: string }> {
    await this.expenseRepo.softDelete(id);
    return { message: 'soft delete successfully' };
  }

  async restore(id: number): Promise<{ message: string }> {
    await this.expenseRepo.restore(id);
    return { message: 'restore successfully' };
  }

  async getSummary(query: FindBranchExpenseDto): Promise<SummaryResponse> {
    const qb = this.expenseRepo
      .createQueryBuilder('branch_expenses')
      .withDeleted()
      .leftJoin('branch_expenses.branch', 'branch')
      .leftJoin('branch_expenses.expense_category', 'category');

    // Apply same filters as findAll (except status)
    if (query.branchId) {
      qb.andWhere('branch_expenses.branch_id = :branchId', { branchId: query.branchId });
    }
    if (query.branchName) {
      qb.andWhere('LOWER(branch.name) LIKE LOWER(:branchName)', { 
        branchName: `%${query.branchName}%` 
      });
    }
    if (query.expenseCategoryId) {
      qb.andWhere('branch_expenses.expense_category_id = :categoryId', { 
        categoryId: query.expenseCategoryId 
      });
    }
    if (query.expenseCategoryName) {
      qb.andWhere('LOWER(category.name) LIKE LOWER(:categoryName)', { 
        categoryName: `%${query.expenseCategoryName}%` 
      });
    }
    if (query.createdFrom) {
      qb.andWhere('branch_expenses.createdAt >= :createdFrom', { 
        createdFrom: query.createdFrom 
      });
    }
    if (query.createdTo) {
      qb.andWhere('branch_expenses.createdAt <= :createdTo', { 
        createdTo: query.createdTo 
      });
    }
    if (query.search) {
      qb.andWhere('branch_expenses.expense_no LIKE :kw', {
        kw: `%${query.search}%`,
      });
    }
    if (query.is_active) {
      if (query.is_active === 'active') {
        qb.andWhere('branch_expenses.deletedAt IS NULL');
      } else {
        qb.andWhere('branch_expenses.deletedAt IS NOT NULL');
      }
    }

    // Apply status filter if specified
    if (query.expenseStatus && query.expenseStatus !== ExpenseStatusFilter.ALL) {
      qb.andWhere('branch_expenses.status = :status', { status: query.expenseStatus });
    }

    const result = await qb
      .select('SUM(branch_expenses.amount)', 'total_amount_all')
      .addSelect(
        `SUM(CASE WHEN branch_expenses.status = 'PENDING' THEN 1 ELSE 0 END)`,
        'count_pending',
      )
      .addSelect(
        `SUM(CASE WHEN branch_expenses.status = 'APPROVED' THEN 1 ELSE 0 END)`,
        'count_approved',
      )
      .addSelect(
        `SUM(CASE WHEN branch_expenses.status = 'REJECTED' THEN 1 ELSE 0 END)`,
        'count_rejected',
      )
      .addSelect('COUNT(*)', 'total_count')
      .getRawOne();

    return {
      total_amount_all: Number(result?.total_amount_all || 0),
      count_pending: Number(result?.count_pending || 0),
      count_approved: Number(result?.count_approved || 0),
      count_rejected: Number(result?.count_rejected || 0),
      total_count: Number(result?.total_count || 0),
    };
  }
}
