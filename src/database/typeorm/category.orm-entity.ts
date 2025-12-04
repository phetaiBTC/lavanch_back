import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ProductOrm } from './product.orm-entity';
import { ShardOrm } from 'src/shared/typeorm/base.orm-entity';

@Entity('Category')
export class CategoryOrm extends ShardOrm {
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @ManyToOne(() => CategoryOrm, (category) => category.children, {
    nullable: true,
  })
  @JoinColumn({ name: 'parent_id' })
  parent?: CategoryOrm;

  @OneToMany(() => CategoryOrm, (category) => category.parent)
  children: CategoryOrm[];

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @OneToMany(() => ProductOrm, (product) => product.category)
  products: ProductOrm[];
}
