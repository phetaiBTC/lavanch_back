import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Index,
} from 'typeorm';
import { ProductVariantOrm } from './product-variant.orm-entity';
import { UnitOrm } from './unit.orm-entity';
import { ShardOrm } from 'src/shared/typeorm/base.orm-entity';

@Entity({ name: 'tiered_prices' })
@Index(['product_variant', 'unit', 'min_quantity'])
export class TieredPriceOrm extends ShardOrm {
  @ManyToOne(() => ProductVariantOrm, (variant) => variant.tiered_prices, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  product_variant: ProductVariantOrm;

  @ManyToOne(() => UnitOrm, (unit) => unit.tiered_prices, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  unit: UnitOrm;

  @Column({ type: 'int', nullable: false })
  min_quantity: number;

  @Column({ type: 'int', nullable: true })
  max_quantity?: number;

  @Column({ type: 'decimal', nullable: false, precision: 12, scale: 2 })
  price_per_unit: number;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;
}
