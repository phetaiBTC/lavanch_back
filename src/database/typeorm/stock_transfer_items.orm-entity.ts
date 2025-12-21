import { ShardOrm } from 'src/shared/typeorm/base.orm-entity';
import { Entity, Column, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { Stock_transfersOrm } from './stock_transfers.orm-entity';
import { ProductVariantOrm } from './product-variant.orm-entity';
import { ProductLotOrm } from './product_lot.orm-entity';

@Entity('stock_transfer_items')
export class Stock_transfer_itemsOrm extends ShardOrm {
  @ManyToOne(
    () => Stock_transfersOrm,
    (stock_transfers) => stock_transfers.stock_transfer_items,
  )
  stock_transfers: Stock_transfersOrm;
  @ManyToOne(() => ProductVariantOrm, (variant) => variant.stock_transfer_items)
  product_variant: ProductVariantOrm;
  @ManyToOne(() => ProductLotOrm, (lot) => lot.stock_transfer_items)
  product_lot: ProductLotOrm;
  @Column({ type: 'int', default: 0 })
  quantity: number;
}
