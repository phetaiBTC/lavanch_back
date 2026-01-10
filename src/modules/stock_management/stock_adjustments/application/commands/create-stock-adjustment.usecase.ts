import { Inject, Injectable } from '@nestjs/common';
import {
  STOCK_ADJUCTMENT_REPOSITORY,
  type IStockAdjustmentRepository,
} from '../../domain/stock-adjustment.repository';
import { EntityManager } from 'typeorm';
import { CreateStockAdjustmentDto } from '../../dto/create-stock-adjustment.dto';
import { StockAdjustmentItem } from '../../domain/stock-adjustment-item.entity';
import { StockAdjustment } from '../../domain/stock-adjustment.entity';
import { TransactionService } from 'src/shared/utils/transaction.util';
import { StockAdjustmentsStatus } from 'src/database/typeorm/stock_adjustments.orm-entity';

@Injectable()
export class CreateStockAdjustmentUseCase {
  constructor(
    @Inject(STOCK_ADJUCTMENT_REPOSITORY)
    private readonly repo: IStockAdjustmentRepository,
    private tx: TransactionService,
  ) {}

  async execute(dto: CreateStockAdjustmentDto): Promise<{ message: string }> {
    return await this.tx.run(async (manager) => {
      const items = dto.items.map(
        (i) =>
          new StockAdjustmentItem({
            productVariantId: i.productVariantId,
            productLotId: i.productLotId,
            systemQuantity: i.systemQuantity,
            actualQuantity: i.actualQuantity,
          }),
      );
      const stockAdjustment = new StockAdjustment({
        branchId: dto.branchId,
        adjustmentNo: dto.adjustmentNo,
        description: dto.description,
        createdBy: dto.createdBy,
        status: StockAdjustmentsStatus.PENDING,
        approvedBy: undefined,
        items,
      });

      return this.repo.save(manager, stockAdjustment);
    });
  }
}
