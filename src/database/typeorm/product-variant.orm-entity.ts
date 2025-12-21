import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
  OneToMany,
} from 'typeorm';
import { ProductOrm } from './product.orm-entity';
import { ShardOrm } from 'src/shared/typeorm/base.orm-entity';
import { ProductUnitOrm } from './product-unit.orm-entity';
import { PriceHistoryOrm } from './price_history.orm-entity';
import { ProductPriceOrm } from './product_price.orm-entity';
import { TieredPriceOrm } from './tiered-price.orm-entity';
import { Branch_stocksOrm } from './branch_stocks.orm-entity';
import { Stock_transfer_itemsOrm } from './stock_transfer_items.orm-entity';
import { Inbound_order_itemsOrm } from './inbound_order_items.orm-entity';

@Entity('Product_variant')
export class ProductVariantOrm extends ShardOrm {
  @ManyToOne(() => ProductOrm, (product) => product.product_variants, {
    nullable: false,
  })
  @JoinColumn({ name: 'product_id' })
  product: ProductOrm;

  @OneToMany(() => ProductUnitOrm, (unit) => unit.product_variant)
  units: ProductUnitOrm[];

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: true })
  sku?: string;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: true })
  barcode?: string;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @OneToMany(() => PriceHistoryOrm, (ph) => ph.product_variant, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  price_histories: PriceHistoryOrm[];

  @OneToMany(() => ProductPriceOrm, (pp) => pp.product_variant, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  product_prices: ProductPriceOrm[];

  @OneToMany(() => TieredPriceOrm, (tp) => tp.product_variant, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  tiered_prices: TieredPriceOrm[];

  @OneToMany(() => Branch_stocksOrm, (branchStock) => branchStock.variant)
  branch_stocks: ProductUnitOrm[];

  @OneToMany(
    () => Stock_transfer_itemsOrm,
    (stock_transfer_items) => stock_transfer_items.product_variant,
  )
  stock_transfer_items: Stock_transfer_itemsOrm[];

  @OneToMany(
    () => Inbound_order_itemsOrm,
    (inbound_order_items) => inbound_order_items.variant,
  )
  inbound_order_items: Inbound_order_itemsOrm[];
}
