import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { BranchExpense } from './branch-expense.entity';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { IRemoveRepository } from 'src/shared/interface/removeRepository.interface';

export const BRANCH_EXPENSE_REPOSITORY = Symbol('BRANCH_EXPENSE_REPOSITORY');

export interface IBranchExpenseRepository extends IRemoveRepository {
  findAll(query: PaginationDto): Promise<PaginatedResponse<BranchExpense>>;
  findById(id: number): Promise<BranchExpense | null>;
  create(expense: BranchExpense): Promise<BranchExpense>;
  update(expense: BranchExpense): Promise<BranchExpense>;
  findByBranch(
    branchId: number,
    query: PaginationDto,
  ): Promise<PaginatedResponse<BranchExpense>>;
  findByExpenseNo(expenseNo: string): Promise<BranchExpense | null>;
  generateExpenseNo(): Promise<string>;
}
