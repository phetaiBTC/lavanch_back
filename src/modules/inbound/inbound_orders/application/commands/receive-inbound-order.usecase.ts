import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TransactionService } from 'src/shared/utils/transaction.util';
import {
  type IInboundOrderRepository,
  INBOUND_ORDER_REPOSITORY,
} from '../../domain/inbound-order.repository';
import {
  type IStockMovementRepository,
  STOCK_MOVEMENT_REPOSITORY,
} from 'src/modules/stock_management/stock_movements/domain/stock-movement.repository';
import { ReceiveInboundOrderDto } from '../../dto/receive-inbound-order.dto';
import { AuthPayload } from 'src/modules/auth/interface/auth.interface';
import { StockMovement } from 'src/modules/stock_management/stock_movements/domain/stock-movement.entity';
import { StockMovementType } from 'src/database/typeorm/stock_movements.orm-entity';
import { InboundOrdersStatus } from 'src/database/typeorm/inbound_orders.orm-entity';
import {
  BRANCH_STOCK_REPOSITORY,
  type IBranchStockRepository,
} from 'src/modules/stock_management/branch_stocks/domain/branch-stock.repository';
@Injectable()
export class ReceiveInboundOrderUseCase {
  constructor(
    @Inject(INBOUND_ORDER_REPOSITORY)
    private readonly repo: IInboundOrderRepository,
    @Inject(STOCK_MOVEMENT_REPOSITORY)
    private readonly stockRepo: IStockMovementRepository,
    @Inject(BRANCH_STOCK_REPOSITORY)
    private readonly branchStockRepo: IBranchStockRepository,
    private readonly tx: TransactionService,
  ) {}

  async execute(id: number, dto: ReceiveInboundOrderDto, user: AuthPayload) {
    return await this.tx.run(async (manager) => {
      const order = await this.repo.loadById(manager, id);
      if (!order) throw new NotFoundException('Inbound order not found');
      for (const i of dto.items) {
        const item = order.receiveItem(i.itemId, i.received_quantity);
        await this.branchStockRepo.increase(
          manager,
          order.branch_id,
          item.productVariantId,
          i.received_quantity,
        );
        const stockMovement = new StockMovement({
          branchId: order.branch_id,
          productVariantId: item.productVariantId,
          productLotId: item.productLotId,
          movementType: StockMovementType.INBOUND,
          quantity: i.received_quantity,
          createdBy: user.id,
          movementDate: new Date(),
          referenceId: order.id,
          referenceTable: 'inbound_orders',
        });
        // console.log(stockMovement)
        await this.stockRepo.save(manager, stockMovement);
      }
      await this.repo.save(manager, order);
      return { message: 'Inbound order received successfully' };
    });
  }
}
