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
import { WalletAdjustment } from '../../domain/wallet-adjustment.entity';
import {
  ApproveAdjustmentDto,
  ApprovalAction,
} from '../../dto/approve-adjustment.dto';
import { CreateWalletTransactionUseCase } from '../../../wallet_transactions/application/commands/create-wallet-transaction.usecase';
import { TransactionTypeEnum } from '../../../wallet_transactions/dto/create-wallet-transaction.dto';
import { AdjustmentTypeEnum } from '../../dto/create-wallet-adjustment.dto';

/**
 * ApproveAdjustmentUseCase
 * 
 * This use case handles the approval or rejection of wallet adjustments.
 * When approved:
 * 1. Create a wallet transaction with type ADJUSTMENT
 * 2. If adjustment_type is ADD: increases branch balance
 * 3. If adjustment_type is DEDUCT: decreases branch balance
 * 4. Link the wallet transaction to the adjustment
 * 5. Update adjustment status to APPROVED
 */
@Injectable()
export class ApproveAdjustmentUseCase {
  constructor(
    @Inject(WALLET_ADJUSTMENT_REPOSITORY)
    private readonly adjustmentRepo: IWalletAdjustmentRepository,
    private readonly createWalletTransactionUseCase: CreateWalletTransactionUseCase,
  ) {}

  async execute(
    id: number,
    dto: ApproveAdjustmentDto,
    approvedBy: number,
  ): Promise<WalletAdjustment> {
    // Get adjustment
    const adjustment = await this.adjustmentRepo.findById(id);
    if (!adjustment) {
      throw new NotFoundException(`Adjustment with ID ${id} not found`);
    }

    // Validate adjustment status
    if (adjustment.value.status !== 'PENDING') {
      throw new BadRequestException(
        `Adjustment is already ${adjustment.value.status.toLowerCase()}`,
      );
    }

    if (dto.action === ApprovalAction.REJECT) {
      // Simply reject without creating wallet transaction
      const rejected = adjustment.reject(dto.approved_by);
      return this.adjustmentRepo.update(rejected);
    }

    // APPROVE: Determine transaction type based on adjustment type
    // ADD adjustment increases balance, DEDUCT adjustment decreases balance
    const transactionType =
      adjustment.value.adjustment_type === AdjustmentTypeEnum.ADD
        ? TransactionTypeEnum.DEPOSIT // Use DEPOSIT to add balance
        : TransactionTypeEnum.WITHDRAW; // Use WITHDRAW to deduct balance

    // Create wallet transaction
    const walletTransaction =
      await this.createWalletTransactionUseCase.execute({
        branch_id: adjustment.value.branch_id,
        transaction_type: transactionType,
        amount: adjustment.value.amount,
        reference_type: 'ADJUSTMENT',
        reference_id: adjustment.value.id!,
        reference_no: adjustment.value.adjustment_no,
        description: `Adjustment (${adjustment.value.adjustment_type}): ${adjustment.value.reason}`,
        notes: adjustment.value.description,
        created_by: dto.approved_by,
        approved_by: dto.approved_by,
      });

    // Approve adjustment and link wallet transaction
    const approved = adjustment.approve(
      dto.approved_by,
      walletTransaction.value.id!,
    );

    return this.adjustmentRepo.update(approved);
  }
}
