import { ShardOrm } from 'src/shared/typeorm/base.orm-entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';

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
}
