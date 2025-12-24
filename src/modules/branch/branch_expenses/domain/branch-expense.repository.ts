import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { BranchExpense } from './branch-expense.entity';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { IRemoveRepository } from 'src/shared/interface/removeRepository.interface';
import { FindBranchExpenseDto } from '../dto/find-branch-expense.dto';

export const BRANCH_EXPENSE_REPOSITORY = Symbol('BRANCH_EXPENSE_REPOSITORY');

export interface SummaryResponse {
  total_amount_all: number;
  count_pending: number;
  count_approved: number;
  count_rejected: number;
  total_count: number;
}

export interface IBranchExpenseRepository extends IRemoveRepository {
  findAll(
    query: FindBranchExpenseDto,
  ): Promise<PaginatedResponse<BranchExpense>>;
  findById(id: number): Promise<BranchExpense | null>;
  create(expense: BranchExpense): Promise<BranchExpense>;
  update(expense: BranchExpense): Promise<BranchExpense>;
  findByBranch(
    branchId: number,
    query: PaginationDto,
  ): Promise<PaginatedResponse<BranchExpense>>;
  findByExpenseNo(expenseNo: string): Promise<BranchExpense | null>;
  generateExpenseNo(): Promise<string>;
  getSummary(query: FindBranchExpenseDto): Promise<SummaryResponse>;
}
