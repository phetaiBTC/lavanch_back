import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import {
  BRANCH_EXPENSE_REPOSITORY,
  type IBranchExpenseRepository,
} from '../../domain/branch-expense.repository';
import { BranchExpense } from '../../domain/branch-expense.entity';
import { ApproveExpenseDto, ApprovalAction } from '../../dto/approve-expense.dto';
import { CreateWalletTransactionUseCase } from '../../../wallet_transactions/application/commands/create-wallet-transaction.usecase';
import { TransactionTypeEnum } from '../../../wallet_transactions/dto/create-wallet-transaction.dto';

/**
 * ApproveExpenseUseCase
 * 
 * This use case handles the approval or rejection of branch expenses.
 * When approved:
 * 1. Create a wallet transaction with type EXPENSE
 * 2. The wallet transaction automatically deducts the amount from branch balance
 * 3. Link the wallet transaction to the expense
 * 4. Update expense status to APPROVED
 */
@Injectable()
export class ApproveExpenseUseCase {
  constructor(
    @Inject(BRANCH_EXPENSE_REPOSITORY)
    private readonly expenseRepo: IBranchExpenseRepository,
    private readonly createWalletTransactionUseCase: CreateWalletTransactionUseCase,
  ) {}

  async execute(id: number, dto: ApproveExpenseDto): Promise<BranchExpense> {
    // Get expense
    const expense = await this.expenseRepo.findById(id);
    if (!expense) {
      throw new NotFoundException(`Expense with ID ${id} not found`);
    }

    // Validate expense status
    if (expense.value.status !== 'PENDING') {
      throw new BadRequestException(
        `Expense is already ${expense.value.status.toLowerCase()}`,
      );
    }

    if (dto.action === ApprovalAction.REJECT) {
      // Simply reject without creating wallet transaction
      const rejected = expense.reject(dto.approved_by);
      return this.expenseRepo.update(rejected);
    }

    // APPROVE: Create wallet transaction to deduct from branch balance
    const walletTransaction = await this.createWalletTransactionUseCase.execute({
      branch_id: expense.value.branch_id,
      transaction_type: TransactionTypeEnum.EXPENSE,
      amount: expense.value.amount,
      reference_type: 'EXPENSE',
      reference_id: expense.value.id!,
      reference_no: expense.value.expense_no,
      description: `Expense: ${expense.value.description || expense.value.expense_no}`,
      notes: expense.value.notes,
      created_by: dto.approved_by,
      approved_by: dto.approved_by,
    });

    // Approve expense and link wallet transaction
    const approved = expense.approve(
      dto.approved_by,
      walletTransaction.value.id!,
    );

    return this.expenseRepo.update(approved);
  }
}
