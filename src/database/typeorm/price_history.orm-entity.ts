import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { ProductVariant } from 'src/modules/product_variant/domain/product_variant.entity';
import { UnitOrm } from './unit.orm-entity';
import { UserOrm } from './user.orm-entity';
import { ShardOrm } from 'src/shared/typeorm/base.orm-entity';
import { ProductVariantOrm } from './product-variant.orm-entity';

@Entity('price_history')
export class PriceHistoryOrm extends ShardOrm {
  @ManyToOne(() => ProductVariantOrm, { eager: true, nullable: false })
  @JoinColumn({ name: 'product_variant_id' })
  product_variant: ProductVariantOrm;

  @ManyToOne(() => UnitOrm, { eager: true, nullable: false })
  @JoinColumn({ name: 'unit_id' })
  unit: UnitOrm;

  @Column('decimal', { precision: 15, scale: 2, nullable: true })
  old_cost_price?: number;

  @Column('decimal', { precision: 15, scale: 2, nullable: true })
  new_cost_price?: number;

  @Column('decimal', { precision: 15, scale: 2, nullable: true })
  old_selling_price?: number;

  @Column('decimal', { precision: 15, scale: 2, nullable: true })
  new_selling_price?: number;

  @ManyToOne(() => UserOrm, { eager: true, nullable: false })
  @JoinColumn({ name: 'changed_by' })
  changed_by: UserOrm;

  @CreateDateColumn({ type: 'timestamp' })
  change_date: Date;

  @Column({ type: 'text', nullable: true })
  reason?: string;
}
