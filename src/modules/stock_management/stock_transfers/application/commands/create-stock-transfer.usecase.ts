import { Inject, Injectable } from '@nestjs/common';
import {
  type IStockTransferRepository,
  STOCK_TRANSFER_REPOSITORY,
} from '../../domain/stock-transfer.repository';
import { EntityManager } from 'typeorm';
import { CreateStockTransferDto } from '../../dto/create-stock-transfer.dto';
import { StockTransferItem } from '../../domain/stock-transfer-item.entity';
import {
  StockTransfer,
  StockTransferStatus,
} from '../../domain/stock-transfer.entity';
import { TransactionService } from 'src/shared/utils/transaction.util';

@Injectable()
export class CreateStockTransferUseCase {
  constructor(
    @Inject(STOCK_TRANSFER_REPOSITORY)
    private readonly repo: IStockTransferRepository,
    private tx: TransactionService,
  ) {}

  async execute(dto: CreateStockTransferDto): Promise<{ message: string }> {
    return await this.tx.run(async (manager) => {
      const items = dto.items.map(
        (i) =>
          new StockTransferItem({
            productVariantId: i.productVariantId,
            productLotId: i.productLotId,
            quantity: i.quantity,
            receivedQuantity: 0,
          }),
      );

      const transfer = new StockTransfer({
        fromBranchId: dto.fromBranchId,
        toBranchId: dto.toBranchId,
        status: StockTransferStatus.PENDING,
        items,
      });

      return this.repo.save(manager, transfer);
    });
  }
}
