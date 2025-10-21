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
}
