import { Injectable, Inject } from '@nestjs/common';
import {
  BRANCH_EXPENSE_REPOSITORY,
  type IBranchExpenseRepository,
} from '../../domain/branch-expense.repository';
import { BranchExpense } from '../../domain/branch-expense.entity';
import { CreateBranchExpenseDto } from '../../dto/create-branch-expense.dto';

@Injectable()
export class CreateBranchExpenseUseCase {
  constructor(
    @Inject(BRANCH_EXPENSE_REPOSITORY)
    private readonly expenseRepo: IBranchExpenseRepository,
  ) {}

  /**
   * Create a new branch expense with PENDING status
   * The expense will be created but won't affect wallet balance until approved
   */
  async execute(dto: CreateBranchExpenseDto, createdBy: number): Promise<BranchExpense> {
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
