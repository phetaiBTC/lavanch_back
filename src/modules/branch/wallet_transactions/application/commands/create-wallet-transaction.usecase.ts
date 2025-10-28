import {
  Injectable,
  Inject,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import {
  WALLET_TRANSACTION_REPOSITORY,
  type IWalletTransactionRepository,
} from '../../domain/wallet-transaction.repository';
import {
  BRANCH_REPOSITORY,
  type IBranchRepository,
} from '../../../branch/domain/branch.repository';
import { WalletTransaction } from '../../domain/wallet-transaction.entity';
import { CreateWalletTransactionDto } from '../../dto/create-wallet-transaction.dto';
import { DataSource } from 'typeorm';
import type { ITransactionManager } from 'src/database/transaction/transaction.interface';
import { TRANSACTION_MANAGER_SERVICE } from 'src/shared/constants/inject-key';

/**
 * CreateWalletTransactionUseCase
 * 
 * This use case handles the creation of wallet transactions and automatically updates
 * the branch wallet balance. It uses database transactions to ensure data consistency.
 * 
 * Logic Flow:
 * 1. Validate branch exists
 * 2. Get current wallet balance (balance_before)
 * 3. Calculate new balance based on transaction type:
 *    - DEPOSIT, TRANSFER_IN, REFUND, SALE: Add to balance
 *    - WITHDRAW, TRANSFER_OUT, EXPENSE, ADJUSTMENT (DEDUCT): Subtract from balance
 * 4. Ensure balance doesn't go negative
 * 5. Create wallet transaction record with balance_before and balance_after
 * 6. Update branch wallet_balance
 * 7. Handle TRANSFER: Create corresponding transaction in related branch
 */
@Injectable()
export class CreateWalletTransactionUseCase {
  constructor(
    @Inject(WALLET_TRANSACTION_REPOSITORY)
    private readonly transactionRepo: IWalletTransactionRepository,
    @Inject(BRANCH_REPOSITORY)
    private readonly branchRepo: IBranchRepository,
  @Inject(DataSource)
  private readonly dataSource: DataSource,
  @Inject(TRANSACTION_MANAGER_SERVICE)
  private readonly transactionManager: ITransactionManager,
  ) {}

  async execute(dto: CreateWalletTransactionDto): Promise<WalletTransaction> {
    // Validate branch exists
    const branch = await this.branchRepo.findById(dto.branch_id);
    if (!branch) {
      throw new NotFoundException(`Branch with ID ${dto.branch_id} not found`);
    }

    // Use transaction to ensure data consistency
    return await this.transactionManager.runInTransaction(
      this.dataSource,
      async (manager) => {
        // Get current balance
        const currentBalance = await this.branchRepo.getWalletBalance(
          dto.branch_id,
        );

        // Calculate new balance based on transaction type
        const { newBalance, balanceBefore, balanceAfter } =
          this.calculateBalance(currentBalance, dto.amount, dto.transaction_type);

        // Ensure balance doesn't go negative
        if (newBalance < 0) {
          throw new BadRequestException(
            `Insufficient balance. Current: ${currentBalance}, Required: ${dto.amount}`,
          );
        }

        // Create wallet transaction
        const transaction = new WalletTransaction({
          ...dto,
          balance_before: balanceBefore,
          balance_after: balanceAfter,
          status: 'COMPLETED',
        });

        const savedTransaction = await this.transactionRepo.create(transaction);

        // Update branch wallet balance
        await this.branchRepo.updateWalletBalance(dto.branch_id, newBalance);

        // Handle TRANSFER: Create corresponding transaction in related branch
        if (
          dto.transaction_type === 'TRANSFER_OUT' &&
          dto.related_branch_id
        ) {
          await this.createTransferInTransaction(
            dto,
            savedTransaction.value.id!,
          );
        }

        return savedTransaction;
      },
    );
  }

  /**
   * Calculate balance based on transaction type
   * @param currentBalance - Current wallet balance
   * @param amount - Transaction amount
   * @param transactionType - Type of transaction
   * @returns Object with newBalance, balanceBefore, balanceAfter
   */
  private calculateBalance(
    currentBalance: number,
    amount: number,
    transactionType: string,
  ): { newBalance: number; balanceBefore: number; balanceAfter: number } {
    const balanceBefore = currentBalance;
    let balanceAfter: number;

    // Transaction types that ADD to balance
    const addTypes = ['DEPOSIT', 'TRANSFER_IN', 'REFUND', 'SALE'];

    // Transaction types that SUBTRACT from balance
    const subtractTypes = ['WITHDRAW', 'TRANSFER_OUT', 'EXPENSE', 'ADJUSTMENT'];

    if (addTypes.includes(transactionType)) {
      balanceAfter = balanceBefore + amount;
    } else if (subtractTypes.includes(transactionType)) {
      balanceAfter = balanceBefore - amount;
    } else {
      throw new BadRequestException(`Invalid transaction type: ${transactionType}`);
    }

    return {
      newBalance: balanceAfter,
      balanceBefore,
      balanceAfter,
    };
  }

  /**
   * Create TRANSFER_IN transaction for the receiving branch
   * @param originalDto - Original transfer out DTO
   * @param relatedTransactionId - ID of the TRANSFER_OUT transaction
   */
  private async createTransferInTransaction(
    originalDto: CreateWalletTransactionDto,
    relatedTransactionId: number,
  ): Promise<void> {
    if (!originalDto.related_branch_id) {
      throw new BadRequestException('Related branch ID is required for transfers');
    }

    // Validate related branch exists
    const relatedBranch = await this.branchRepo.findById(
      originalDto.related_branch_id,
    );
    if (!relatedBranch) {
      throw new NotFoundException(
        `Related branch with ID ${originalDto.related_branch_id} not found`,
      );
    }

    // Get current balance of receiving branch
    const currentBalance = await this.branchRepo.getWalletBalance(
      originalDto.related_branch_id,
    );

    // Create TRANSFER_IN transaction
    const transferInTransaction = new WalletTransaction({
      branch_id: originalDto.related_branch_id,
      transaction_type: 'TRANSFER_IN',
      amount: originalDto.amount,
      balance_before: currentBalance,
      balance_after: currentBalance + originalDto.amount,
      reference_type: 'TRANSFER',
      reference_no: originalDto.reference_no,
      related_branch_id: originalDto.branch_id,
      related_transaction_id: relatedTransactionId,
      description: `Transfer from branch ${originalDto.branch_id}`,
      notes: originalDto.notes,
      created_by: originalDto.created_by,
      status: 'COMPLETED',
    });

    await this.transactionRepo.create(transferInTransaction);

    // Update receiving branch wallet balance
    await this.branchRepo.updateWalletBalance(
      originalDto.related_branch_id,
      currentBalance + originalDto.amount,
    );
  }
}
