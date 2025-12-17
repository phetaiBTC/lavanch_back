import { ShardOrm } from 'src/shared/typeorm/base.orm-entity';
import { Entity, Column, ManyToOne } from 'typeorm';
import { ProductVariantOrm } from './product-variant.orm-entity';
import { StockTransfersOrm } from './stock_transfers.orm-entity';
import { ProductLotOrm } from './product_lot.orm-entity';

@Entity('stock_transfers_items')
export class StockTransfersItemsOrm extends ShardOrm {
  @Column()
  quantity: number;
  @ManyToOne(
    () => ProductVariantOrm,
    (ProductVariant) => ProductVariant.stock_transfers_items,
  )
  stock_transfer: StockTransfersOrm;
  @ManyToOne(
    () => ProductVariantOrm,
    (ProductVariant) => ProductVariant.stock_transfers_items,
  )
  product_variant: ProductVariantOrm;
  @ManyToOne(
    () => ProductLotOrm,
    (ProductLot) => ProductLot.stock_transfers_items,
  )
  product_lot: ProductLotOrm;
}
