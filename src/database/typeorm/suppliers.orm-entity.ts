import { ShardOrm } from 'src/shared/typeorm/base.orm-entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { ProvinceOrm } from './province.orm-entity';
import { VillageOrm } from './village.orm-entity';

@Entity('suppliers')
export class SuppliersOrm extends ShardOrm {
  @Column()
  name: string;
  @Column()
  contact_person: string;
  @Column()
  phone: string;
  @Column()
  email: string;
  @Column()
  address: string;
  @Column()
  is_active: boolean;
  @ManyToOne(() => VillageOrm, (village) => village.suppliers)
  village?: VillageOrm;
}
