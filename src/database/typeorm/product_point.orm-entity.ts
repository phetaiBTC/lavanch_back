import { Entity, Column, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { ProductVariantOrm } from './product-variant.orm-entity';
import { UnitOrm } from './unit.orm-entity';
import { ShardOrm } from 'src/shared/typeorm/base.orm-entity';

@Entity('product_points')
export class ProductPointOrm extends ShardOrm {
  @ManyToOne(() => ProductVariantOrm, { nullable: false })
  @JoinColumn({ name: 'product_variant_id' })
  product_variant: ProductVariantOrm;

  @ManyToOne(() => UnitOrm, { nullable: false })
  @JoinColumn({ name: 'unit_id' })
  unit: UnitOrm;

  @Column({ type: 'int', default: 0 })
  points_per_unit: number;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @Column({ type: 'date', nullable: false })
  effective_date: Date;
}
