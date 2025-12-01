import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BranchExpensesOrm } from 'src/database/typeorm/branch_expenses.orm-entity';
import { IBranchExpenseRepository } from '../domain/branch-expense.repository';
import { BranchExpense } from '../domain/branch-expense.entity';
import { BranchExpenseMapper } from './branch-expense.mapper';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { fetchWithPagination } from 'src/shared/utils/pagination.util';

@Injectable()
export class BranchExpenseRepositoryImpl implements IBranchExpenseRepository {
  constructor(
    @InjectRepository(BranchExpensesOrm)
    private readonly expenseRepo: Repository<BranchExpensesOrm>,
  ) {}

  async findAll(
    query: PaginationDto,
  ): Promise<PaginatedResponse<BranchExpense>> {
    const qb = this.expenseRepo
      .createQueryBuilder('branch_expenses')
      .withDeleted()
      .leftJoinAndSelect('branch_expenses.branch', 'branch')
      .leftJoinAndSelect('branch_expenses.expense_category', 'category')
      .leftJoinAndSelect('branch_expenses.creator', 'creator');

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
}
