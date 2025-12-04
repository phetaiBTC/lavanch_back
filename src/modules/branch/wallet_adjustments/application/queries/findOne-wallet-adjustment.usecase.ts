import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import {
  WALLET_ADJUSTMENT_REPOSITORY,
  type IWalletAdjustmentRepository,
} from '../../domain/wallet-adjustment.repository';
import { WalletAdjustment } from '../../domain/wallet-adjustment.entity';

@Injectable()
export class FindOneWalletAdjustmentUseCase {
  constructor(
    @Inject(WALLET_ADJUSTMENT_REPOSITORY)
    private readonly adjustmentRepo: IWalletAdjustmentRepository,
  ) {}

  async execute(id: number): Promise<WalletAdjustment> {
    const adjustment = await this.adjustmentRepo.findById(id);
    if (!adjustment) throw new NotFoundException('Wallet adjustment not found');
    return adjustment;
  }
}
