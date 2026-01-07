import { Injectable } from '@nestjs/common';
import { Stock_transfersOrm } from 'src/database/typeorm/stock_transfers.orm-entity';
import { StockTransfer } from '../domain/stock-transfer.entity';
import { StockTransferItem } from '../domain/stock-transfer-item.entity';

@Injectable()
export class StockTransferMapper {
  toDomain(orm: Stock_transfersOrm): StockTransfer {
    return new StockTransfer({
      id: orm.id,
      fromBranchId: orm.from_branch.id,
      toBranchId: orm.to_branch.id,
      status: orm.status,
      items: orm.stock_transfer_items.map(
        (i) =>
          new StockTransferItem({
            id: i.id,
            productVariantId: i.product_variant.id,
            productLotId: i.product_lot.id,
            quantity: i.quantity,
            receivedQuantity: i.received_quantity,
          }),
      ),
    });
  }
  toSchema(domain: StockTransfer): Partial<Stock_transfersOrm> {
    return {
      status: domain.getStatus(),
    };
  }
}
