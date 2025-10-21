import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { ShardOrm } from 'src/shared/typeorm/base.orm-entity';
import { ProductVariantOrm } from './product-variant.orm-entity';

@Entity('product_lots')
// @Unique(['product_variant', 'lot_number'])
export class ProductLotOrm extends ShardOrm {
  @ManyToOne(() => ProductVariantOrm, { nullable: false })
  @JoinColumn({ name: 'product_variant_id' })
  product_variant: ProductVariantOrm;

  @Column({ type: 'varchar', length: 255, nullable: false })
  lot_number: string;

  @Column({ type: 'date', nullable: true })
  manufacture_date?: Date;

  @Column({ type: 'date', nullable: true })
  expiry_date?: Date;

//   @ManyToOne(() => BranchOrm, { nullable: false })
//   @JoinColumn({ name: 'branch_id' })
//   branch: BranchOrm;

  @Column({ type: 'int', default: 0 })
  quantity: number;

//   @ManyToOne(() => CurrencyOrm, { nullable: false })
//   @JoinColumn({ name: 'cost_currency_id' })
//   cost_currency: CurrencyOrm;

  @Column({ type: 'decimal', nullable: false })
  cost_price_local: number;

  @Column({ type: 'decimal', nullable: false })
  cost_price_original: number;

  @Column({ type: 'decimal', nullable: false })
  fx_rate: number;
}
