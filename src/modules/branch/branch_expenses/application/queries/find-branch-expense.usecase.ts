import { Injectable, Inject } from '@nestjs/common';
import {
  BRANCH_EXPENSE_REPOSITORY,
  type IBranchExpenseRepository,
} from '../../domain/branch-expense.repository';
import { FindBranchExpenseDto } from '../../dto/find-branch-expense.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { BranchExpense } from '../../domain/branch-expense.entity';

@Injectable()
export class FindAllBranchExpenseUseCase {
  constructor(
    @Inject(BRANCH_EXPENSE_REPOSITORY)
    private readonly expenseRepo: IBranchExpenseRepository,
  ) {}

  async execute(
    query: FindBranchExpenseDto,
  ): Promise<PaginatedResponse<BranchExpense>> {
    return this.expenseRepo.findAll(query);
  }
}
