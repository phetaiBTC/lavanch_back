import { 
  Injectable, 
  Inject, 
  NotFoundException, 
  BadRequestException 
} from '@nestjs/common';
import {
  WALLET_ADJUSTMENT_REPOSITORY,
  type IWalletAdjustmentRepository,
} from '../../domain/wallet-adjustment.repository';
import {
  BRANCH_REPOSITORY,
  type IBranchRepository,
} from '../../../branch/domain/branch.repository';
import {
  WALLET_TRANSACTION_REPOSITORY,
  type IWalletTransactionRepository,
} from '../../../wallet_transactions/domain/wallet-transaction.repository';
import { WalletAdjustment } from '../../domain/wallet-adjustment.entity';
import { WalletTransaction } from '../../../wallet_transactions/domain/wallet-transaction.entity';
import { CreateWalletAdjustmentDto, AdjustmentTypeEnum } from '../../dto/create-wallet-adjustment.dto';
import { TransactionTypeEnum } from '../../../wallet_transactions/dto/create-wallet-transaction.dto';
import { DataSource } from 'typeorm';

@Injectable()
export class CreateWalletAdjustmentLostUseCase {
  constructor(
    @Inject(WALLET_ADJUSTMENT_REPOSITORY)
    private readonly adjustmentRepo: IWalletAdjustmentRepository,
    @Inject(BRANCH_REPOSITORY)
    private readonly branchRepo: IBranchRepository,
    @Inject(WALLET_TRANSACTION_REPOSITORY)
    private readonly transactionRepo: IWalletTransactionRepository,
    @Inject(DataSource)
    private readonly dataSource: DataSource,
  ) {}

  /**
   * Create a new wallet adjustment with automatic wallet transaction creation
   * This method handles ADD and DEDUCT operations correctly
   */
  async execute(dto: CreateWalletAdjustmentDto): Promise<WalletAdjustment> {
    // Validate branch exists
    const branch = await this.branchRepo.findById(dto.branch_id);
    if (!branch) {
      throw new NotFoundException(`Branch with ID ${dto.branch_id} not found`);
    }

    // Generate unique adjustment number
    const adjustmentNo = await this.adjustmentRepo.generateAdjustmentNo();

    // Get current wallet balance
    const currentBalance = await this.branchRepo.getWalletBalance(dto.branch_id);

    // Calculate new balance
    let newBalance: number;
    if (dto.adjustment_type === AdjustmentTypeEnum.DEDUCT) {
      newBalance = currentBalance + dto.amount;
    } else {
      newBalance = currentBalance - dto.amount;
      // Prevent negative balance only for DEDUCT operations
      if (newBalance < 0) {
        throw new BadRequestException(
          `Insufficient balance. Current: ${currentBalance}, Required: ${dto.amount}`
        );
      }
    }

    // Create adjustment record with PENDING status
    const adjustment = new WalletAdjustment({
      ...dto,
      adjustment_no: adjustmentNo,
      // status: 'PENDING',
    });

    const savedAdjustment = await this.adjustmentRepo.create(adjustment);

    // Create wallet transaction manually with correct balance calculation
    const walletTransaction = new WalletTransaction({
      branch_id: dto.branch_id,
      transaction_type: TransactionTypeEnum.,
      amount: dto.amount,
      balance_before: currentBalance,
      balance_after: newBalance,
      reference_type: 'WALLET_ADJUSTMENT',
      reference_id: savedAdjustment.value.id!,
      reference_no: adjustmentNo,
      description: `Wallet Adjustment (${dto.adjustment_type}): ${dto.reason}`,
      notes: dto.description,
      created_by: dto.created_by,
      approved_by: dto.created_by,
      status: 'COMPLETED',
    });

    const savedTransaction = await this.transactionRepo.create(walletTransaction);

    // Update branch wallet balance
    await this.branchRepo.updateWalletBalance(dto.branch_id, newBalance);

    // Link wallet transaction to adjustment
    const updatedAdjustment = new WalletAdjustment({
      ...savedAdjustment.value,
      wallet_transaction_id: savedTransaction.value.id!,
      status: 'APPROVED', // Auto-approve adjustments
      approved_by: dto.created_by,
    });

    return this.adjustmentRepo.update(updatedAdjustment);
  }
}
