import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
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
import { CreateWalletTransferDto } from '../../dto/create-wallet-transfer.dto';
import { AdjustmentTypeEnum } from '../../dto/create-wallet-adjustment.dto';
import { TransactionTypeEnum } from '../../../wallet_transactions/dto/create-wallet-transaction.dto';
import { DataSource } from 'typeorm';

@Injectable()
export class CreateWalletAdjustmentTransferUseCase {
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
   * Create a wallet transfer between two branches
   * This method handles transfer with proper balance validation and atomic transactions
   */
  async execute(
    dto: CreateWalletTransferDto,
    createdBy: number,
  ): Promise<WalletAdjustment> {
    // Validate sender and receiver are different branches
    if (dto.branch_id === dto.receiver_branch_id) {
      throw new BadRequestException('Cannot transfer to the same branch');
    }

    // Validate both branches exist
    const [senderBranch, receiverBranch] = await Promise.all([
      this.branchRepo.findById(dto.branch_id),
      this.branchRepo.findById(dto.receiver_branch_id),
    ]);

    if (!senderBranch) {
      throw new NotFoundException(
        `Sender branch with ID ${dto.branch_id} not found`,
      );
    }

    if (!receiverBranch) {
      throw new NotFoundException(
        `Receiver branch with ID ${dto.receiver_branch_id} not found`,
      );
    }

    // Run everything in a database transaction for atomicity
    return await this.dataSource.transaction(async (manager) => {
      // Generate unique adjustment number
      const adjustmentNo = await this.adjustmentRepo.generateAdjustmentNo();

      // Get current wallet balances for both branches
      const [senderBalance, receiverBalance] = await Promise.all([
        this.branchRepo.getWalletBalance(dto.branch_id),
        this.branchRepo.getWalletBalance(dto.receiver_branch_id),
      ]);

      // Calculate new balances
      const newSenderBalance = senderBalance - dto.amount;
      const newReceiverBalance = receiverBalance + dto.amount;

      // Prevent negative balance for sender
      if (newSenderBalance < 0) {
        throw new BadRequestException(
          `Insufficient balance in sender branch. Current: ${senderBalance}, Required: ${dto.amount}`,
        );
      }

      // Create adjustment record for the transfer
      const adjustment = new WalletAdjustment({
        branch_id: dto.branch_id,
        adjustment_type: AdjustmentTypeEnum.DEDUCT,
        amount: dto.amount,
        reason: 'TRANSFER' as any, // Add TRANSFER to AdjustmentReasonEnum if needed
        description:
          dto.description || `Transfer to branch ${dto.receiver_branch_id}`,
        created_by: createdBy,
        adjustment_no: adjustmentNo,
        status: 'APPROVED',
        approved_by: createdBy,
      });

      const savedAdjustment = await this.adjustmentRepo.create(adjustment);

      // Create TRANSFER_OUT transaction for sender branch
      const transferOutTransaction = new WalletTransaction({
        branch_id: dto.branch_id,
        transaction_type: TransactionTypeEnum.TRANSFER_OUT,
        amount: dto.amount,
        balance_before: senderBalance,
        balance_after: newSenderBalance,
        reference_type: 'WALLET_TRANSFER',
        reference_id: savedAdjustment.value.id!,
        reference_no: adjustmentNo,
        related_branch_id: dto.receiver_branch_id,
        description: `Transfer to branch ${dto.receiver_branch_id}`,
        notes: dto.description,
        created_by: createdBy,
        approved_by: createdBy,
        status: 'COMPLETED',
      });

      const savedTransferOut = await this.transactionRepo.create(
        transferOutTransaction,
      );

      // Create TRANSFER_IN transaction for receiver branch
      const transferInTransaction = new WalletTransaction({
        branch_id: dto.receiver_branch_id,
        transaction_type: TransactionTypeEnum.TRANSFER_IN,
        amount: dto.amount,
        balance_before: receiverBalance,
        balance_after: newReceiverBalance,
        reference_type: 'WALLET_TRANSFER',
        reference_id: savedAdjustment.value.id!,
        reference_no: adjustmentNo,
        related_branch_id: dto.branch_id,
        related_transaction_id: savedTransferOut.value.id!,
        description: `Transfer from branch ${dto.branch_id}`,
        notes: dto.description,
        created_by: createdBy,
        approved_by: createdBy,
        status: 'COMPLETED',
      });

      await this.transactionRepo.create(transferInTransaction);

      // Update both branch wallet balances
      await Promise.all([
        this.branchRepo.updateWalletBalance(dto.branch_id, newSenderBalance),
        this.branchRepo.updateWalletBalance(
          dto.receiver_branch_id,
          newReceiverBalance,
        ),
      ]);

      // Link the outgoing transaction to the adjustment
      const updatedAdjustment = new WalletAdjustment({
        ...savedAdjustment.value,
        wallet_transaction_id: savedTransferOut.value.id!,
      });

      return this.adjustmentRepo.update(updatedAdjustment);
    });
  }
}
