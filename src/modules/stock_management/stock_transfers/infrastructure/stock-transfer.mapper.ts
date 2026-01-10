import { Injectable } from '@nestjs/common';
import { Stock_transfersOrm } from 'src/database/typeorm/stock_transfers.orm-entity';
import { StockTransfer } from '../domain/stock-transfer.entity';
import { StockTransferItem } from '../domain/stock-transfer-item.entity';
import { BranchesOrm } from 'src/database/typeorm/branches.orm-entity';
import { UserOrm } from 'src/database/typeorm/user.orm-entity';
import { Stock_transfer_itemsOrm } from 'src/database/typeorm/stock_transfer_items.orm-entity';
import { ProductVariantOrm } from 'src/database/typeorm/product-variant.orm-entity';
import { ProductLotOrm } from 'src/database/typeorm/product_lot.orm-entity';

@Injectable()
export class StockTransferMapper {
  toDomain(orm: Stock_transfersOrm): StockTransfer {
    return new StockTransfer({
      id: orm.id,
      fromBranchId: orm.from_branch.id,
      toBranchId: orm.to_branch.id,
      status: orm.status,
      created_by: orm.created_by.id,
      transfer_date: orm.transfer_date,
      items: orm.stock_transfer_items.map(
        (i) =>
          new StockTransferItem({
            id: i.id,
            productVariantId: i.product_variant.id,
            productLotId: i.product_lot.id,
            quantity: i.quantity,
            receivedQuantity: i.received_quantity,
            // stockTransferId: orm.id
          }),
      ),
    });
  }

  toSchemaItem(
    domain: StockTransferItem,
  orm:{
    product_variant: ProductVariantOrm,
    product_lot?: ProductLotOrm,
    stock_transfers:Stock_transfersOrm

  }): Partial<Stock_transfer_itemsOrm> {
    return {
      id: domain.id,
      product_variant: orm.product_variant,
      product_lot: orm.product_lot,
      quantity: domain.quantity,
      received_quantity: domain.ReceivedQuantity,
      stock_transfers:orm.stock_transfers
    };
  }

  toSchema(
    domain: StockTransfer,
    orm: {
      from_branch: BranchesOrm;
      to_branch: BranchesOrm;
      created_by: UserOrm;
    },
  ): Partial<Stock_transfersOrm> {
    return {
      id: domain.id,
      status: domain.getStatus(),
      from_branch: orm.from_branch,
      to_branch: orm.to_branch,
      created_by: orm.created_by,
      transfer_date: domain.transferDate
    };
  }
}
