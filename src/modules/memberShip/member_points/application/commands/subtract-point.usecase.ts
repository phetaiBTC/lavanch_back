import { Injectable, Inject } from '@nestjs/common';
import { MEMBER_POINT_REPOSITORY, type IMemberPointRepository } from '../../domain/member-point.repository';
import { MEMBER_TRANSACTION_REPOSITORY, type IMemberTransactionRepository } from '../../../member_transactions/domain/member-transaction.repository';
import { MemberPoint } from '../../domain/member-point.entity';
import { MemberTransaction } from '../../../member_transactions/domain/member-transaction.entity';
import { SubtractPointDto } from '../../dto/subtract-point.dto';
import { DataSource } from 'typeorm';
import { TRANSACTION_MANAGER_SERVICE } from 'src/shared/constants/inject-key';
import type { ITransactionManager } from 'src/database/transaction/transaction.interface';

/**
 * SubtractPointUseCase - Atomically subtracts points and logs transaction history
 * 
 * Business Flow:
 * 1. Subtract points from member_points table (validates sufficient balance)
 * 2. Log transaction in member_transactions table
 * 3. Both operations wrapped in DB transaction for atomicity
 * 
 * This ensures: every point redemption MUST have a matching history record
 */
@Injectable()
export class SubtractPointUseCase {
  constructor(
    @Inject(MEMBER_POINT_REPOSITORY)
    private readonly pointRepo: IMemberPointRepository,
    @Inject(MEMBER_TRANSACTION_REPOSITORY)
    private readonly transactionRepo: IMemberTransactionRepository,
    @Inject(DataSource)
    private readonly dataSource: DataSource,
    @Inject(TRANSACTION_MANAGER_SERVICE)
    private readonly transactionManager: ITransactionManager,
  ) {}

  async execute(dto: SubtractPointDto): Promise<MemberPoint> {
    // Wrap in transaction to ensure atomicity
    return await this.transactionManager.runInTransaction(
      this.dataSource,
      async (manager) => {
        // Step 1: Subtract points from member_points balance
        // This will throw BadRequestException if insufficient balance
        const updatedPoint = await this.pointRepo.subtractPoints(
          dto.member_id,
          dto.branch_id,
          dto.points,
        );

        // Get new balance after subtracting points
        const newBalance = await this.pointRepo.getBalance(
          dto.member_id,
          dto.branch_id,
        );

        // Step 2: Create history log in member_transactions
        const transaction = new MemberTransaction({
          member_id: dto.member_id,
          branch_id: dto.branch_id,
          sale_id: dto.sale_id,
          type: 'REDEEM',
          total_amount: 0,
          points_earned: 0,
          points_redeemed: dto.points,
          points_balance: newBalance,
          date: new Date(),
          notes: dto.notes || `Redeemed ${dto.points} points`,
        });

        await this.transactionRepo.create(transaction);

        return updatedPoint;
      },
    );
  }
}
