import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { CategoryOrm } from './category.orm-entity';
import { ShardOrm } from 'src/shared/typeorm/base.orm-entity';
import { ProductVariantOrm } from './product-variant.orm-entity';

@Entity('Product')
export class ProductOrm extends ShardOrm {
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  brand: string;

  @ManyToOne(() => CategoryOrm, (category) => category.products, {
    nullable: false,
  })
  @JoinColumn({ name: 'category_id' })
  category: CategoryOrm;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: true })
  barcode?: string;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @OneToMany(() => ProductVariantOrm, (variant) => variant.product)
  product_variants: ProductVariantOrm[];
}
