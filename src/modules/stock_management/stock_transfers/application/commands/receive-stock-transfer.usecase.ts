import { Inject, Injectable } from '@nestjs/common';
import {
  type IStockTransferRepository,
  STOCK_TRANSFER_REPOSITORY,
} from '../../domain/stock-transfer.repository';
import { EntityManager } from 'typeorm';
import { TransactionService } from 'src/shared/utils/transaction.util';
import { ReceiveStockTransferDto } from '../../dto/receive-stock-transfer.dto';
@Injectable()
export class ReceiveStockTransferUseCase {
  constructor(
    @Inject(STOCK_TRANSFER_REPOSITORY)
    private readonly repo: IStockTransferRepository,
    private tx: TransactionService,
  ) {}

  async execute(dto: ReceiveStockTransferDto): Promise<{ message: string }> {
    return await this.tx.run(async (manager: EntityManager) => {
      const transfer = await this.repo.findById(manager, dto.transferId);
      if (!transfer) throw new Error('Transfer not found');

      dto.items.forEach((i) =>
        transfer.receiveItem(i.itemId, i.receivedQuantity),
      );

      await this.repo.save(manager, transfer);
      return { message: 'Transfer received successfully' };
    });
  }
}
