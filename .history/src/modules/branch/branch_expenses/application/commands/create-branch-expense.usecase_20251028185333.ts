import { Injectable, Inject } from '@nestjs/common';
import {
  BRANCH_EXPENSE_REPOSITORY,
  type IBranchExpenseRepository,
} from '../../domain/branch-expense.repository';
import {
  BRANCH_REPOSITORY,
  type IBranchRepository,
} from '../../../branch/domain/branch.repository';
import { BranchExpense } from '../../domain/branch-expense.entity';
import { CreateBranchExpenseDto } from '../../dto/create-branch-expense.dto';

@Injectable()
export class CreateBranchExpenseUseCase {
  constructor(
    @Inject(BRANCH_EXPENSE_REPOSITORY)
    private readonly expenseRepo: IBranchExpenseRepository,
    @Inject(BRANCH_REPOSITORY)
    private readonly branchRepo: IBranchRepository,
  ) {}

  /**
   * Create a new branch expense with PENDING status
   * The expense will be created but won't affect wallet balance until approved
   */
  async execute(dto: CreateBranchExpenseDto): Promise<BranchExpense> {
    // Verify branch exists
    const branch = await this.branchRepo.findById(dto.branch_id);
    if (!branch) {
      throw new Error(`Branch with id ${dto.branch_id} not found`);
    }

    // Generate unique expense number
    const expenseNo = await this.expenseRepo.generateExpenseNo();

    // Create expense with PENDING status
    const expense = new BranchExpense({
      ...dto,
      expense_no: expenseNo,
      expense_date: new Date(dto.expense_date),
      status: 'PENDING',
    });

    return this.expenseRepo.create(expense);
  }
}
