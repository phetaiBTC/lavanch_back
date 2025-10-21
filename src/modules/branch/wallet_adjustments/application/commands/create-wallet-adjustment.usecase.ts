import { Injectable, Inject } from '@nestjs/common';
import {
  WALLET_ADJUSTMENT_REPOSITORY,
  type IWalletAdjustmentRepository,
} from '../../domain/wallet-adjustment.repository';
import { WalletAdjustment } from '../../domain/wallet-adjustment.entity';
import { CreateWalletAdjustmentDto } from '../../dto/create-wallet-adjustment.dto';

@Injectable()
export class CreateWalletAdjustmentUseCase {
  constructor(
    @Inject(WALLET_ADJUSTMENT_REPOSITORY)
    private readonly adjustmentRepo: IWalletAdjustmentRepository,
  ) {}

  /**
   * Create a new wallet adjustment with PENDING status
   * The adjustment won't affect wallet balance until approved
   */
  async execute(dto: CreateWalletAdjustmentDto): Promise<WalletAdjustment> {
    // Generate unique adjustment number
    const adjustmentNo = await this.adjustmentRepo.generateAdjustmentNo();

    // Create adjustment with PENDING status
    const adjustment = new WalletAdjustment({
      ...dto,
      adjustment_no: adjustmentNo,
      status: 'PENDING',
    });

    return this.adjustmentRepo.create(adjustment);
  }
}
