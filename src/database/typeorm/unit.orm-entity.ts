import { ShardOrm } from 'src/shared/typeorm/base.orm-entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { ProductPriceOrm } from './product_price.orm-entity';
import { PriceHistoryOrm } from './price_history.orm-entity';
import { TieredPriceOrm } from './tiered-price.orm-entity';

@Entity('Unit')
export class UnitOrm extends ShardOrm {
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  name_en?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  abbreviation?: string;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  //   @OneToOne(() => CategoryOrm, (category) => category.children, { nullable: true })
  //   @JoinColumn({ name: 'product_variant' })
  //   product_variant: CategoryOrm;

  @OneToMany(() => ProductPriceOrm, (pp) => pp.unit, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  product_prices: ProductPriceOrm[];

  @OneToMany(() => PriceHistoryOrm, (ph) => ph.unit, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  price_histories: PriceHistoryOrm[];

  @OneToMany(() => TieredPriceOrm, (un) => un.unit, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  tiered_prices: TieredPriceOrm[];
}
