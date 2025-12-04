import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import {
  BRANCH_EXPENSE_REPOSITORY,
  type IBranchExpenseRepository,
} from '../../domain/branch-expense.repository';
import { BranchExpense } from '../../domain/branch-expense.entity';

@Injectable()
export class FindOneBranchExpenseUseCase {
  constructor(
    @Inject(BRANCH_EXPENSE_REPOSITORY)
    private readonly expenseRepo: IBranchExpenseRepository,
  ) {}

  async execute(id: number): Promise<BranchExpense> {
    const expense = await this.expenseRepo.findById(id);
    if (!expense) throw new NotFoundException('Branch expense not found');
    return expense;
  }
}
