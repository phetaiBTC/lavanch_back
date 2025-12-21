import { ShardOrm } from 'src/shared/typeorm/base.orm-entity';
import { Entity, Column, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { Stock_adjustmentsOrm } from './stock_adjustments.orm-entity';
import { ProductVariantOrm } from './product-variant.orm-entity';
import { ProductLotOrm } from './product_lot.orm-entity';

@Entity('stock_adjustment_items')
export class Stock_adjustment_itemsOrm extends ShardOrm {
  @ManyToOne(
    () => Stock_adjustmentsOrm,
    (stock_adjustment) => stock_adjustment.stock_adjustment_items,
  )
  stock_adjustment: Stock_adjustmentsOrm;
  @ManyToOne(() => ProductVariantOrm, (variant) => variant.stock_transfer_items)
  product_variant: ProductVariantOrm;
  @ManyToOne(() => ProductLotOrm, (lot) => lot.stock_transfer_items)
  product_lot: ProductLotOrm;

  @Column({ type: 'int' })
  system_quantity: number;

  @Column({ type: 'int' })
  actual_quantity: number;

  @Column({ type: 'int' })
  difference: number;
}
