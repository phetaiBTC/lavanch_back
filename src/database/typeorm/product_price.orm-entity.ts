import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { UnitOrm } from './unit.orm-entity';
import { ProductVariantOrm } from './product-variant.orm-entity';
import { ShardOrm } from 'src/shared/typeorm/base.orm-entity';

@Entity('product_prices')
@Index(['product_variant', 'unit', 'effective_date'])
export class ProductPriceOrm extends ShardOrm {
  @ManyToOne(() => ProductVariantOrm, { eager: true, nullable: false })
  @JoinColumn({ name: 'product_variant_id' })
  product_variant: ProductVariantOrm;

  @ManyToOne(() => UnitOrm, { eager: true, nullable: false })
  @JoinColumn({ name: 'unit_id' })
  unit: UnitOrm;

  @Column('decimal', { precision: 15, scale: 2, nullable: false })
  cost_price: number;

  @Column('decimal', { precision: 15, scale: 2, nullable: false })
  selling_price: number;

  @Column('decimal', { precision: 15, scale: 2, nullable: true })
  min_price?: number;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @Column({ type: 'date', nullable: false })
  effective_date: Date;
}
