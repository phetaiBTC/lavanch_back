import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { ShardOrm } from 'src/shared/typeorm/base.orm-entity';
import { ProductVariantOrm } from './product-variant.orm-entity';
import { UnitOrm } from './unit.orm-entity';

@Entity('Product_unit')
export class ProductUnitOrm extends ShardOrm {
  @ManyToOne(() => ProductVariantOrm, { nullable: false })
  @JoinColumn({ name: 'product_variant_id' })
  product_variant: ProductVariantOrm;

  @ManyToOne(() => UnitOrm, { nullable: false })
  @JoinColumn({ name: 'unit_id' })
  unit: UnitOrm;

  @Column({ type: 'int', default: 1 })
  quantity_per_unit: number;

  @Column({ type: 'boolean', default: false })
  is_base_unit: boolean;
}
