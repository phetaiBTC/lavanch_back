import { Inject, Injectable } from '@nestjs/common';
import {
  type IStockTransferRepository,
  STOCK_TRANSFER_REPOSITORY,
} from '../../domain/stock-transfer.repository';
import { TransactionService } from 'src/shared/utils/transaction.util';
@Injectable()
export class ApproveStockTransferUseCase {
  constructor(
    @Inject(STOCK_TRANSFER_REPOSITORY)
    private readonly repo: IStockTransferRepository,
    private tx: TransactionService,
  ) {}

  async execute(transferId: number) {
    return await this.tx.run(async (manager) => {
      const transfer = await this.repo.findById(manager, transferId);
      transfer.approve();
      await this.repo.approve(manager, transfer);
      return { message: 'Transfer approved successfully' };
    });
  }
}
