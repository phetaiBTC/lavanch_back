import { Injectable, Inject } from '@nestjs/common';
import {
  BRANCH_EXPENSE_REPOSITORY,
  type IBranchExpenseRepository,
  SummaryResponse,
} from '../../domain/branch-expense.repository';
import { FindBranchExpenseDto } from '../../dto/find-branch-expense.dto';

@Injectable()
export class GetBranchExpenseSummaryUseCase {
  constructor(
    @Inject(BRANCH_EXPENSE_REPOSITORY)
    private readonly expenseRepo: IBranchExpenseRepository,
  ) {}

  async execute(query: FindBranchExpenseDto): Promise<SummaryResponse> {
    return this.expenseRepo.getSummary(query);
  }
}
