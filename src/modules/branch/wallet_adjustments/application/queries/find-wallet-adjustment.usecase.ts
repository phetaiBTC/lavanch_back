import { Injectable, Inject } from '@nestjs/common';
import {
  WALLET_ADJUSTMENT_REPOSITORY,
  type IWalletAdjustmentRepository,
} from '../../domain/wallet-adjustment.repository';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { WalletAdjustment } from '../../domain/wallet-adjustment.entity';

@Injectable()
export class FindAllWalletAdjustmentUseCase {
  constructor(
    @Inject(WALLET_ADJUSTMENT_REPOSITORY)
    private readonly adjustmentRepo: IWalletAdjustmentRepository,
  ) {}

  async execute(
    query: PaginationDto,
  ): Promise<PaginatedResponse<WalletAdjustment>> {
    return this.adjustmentRepo.findAll(query);
  }
}
