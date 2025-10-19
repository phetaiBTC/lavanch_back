import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ProvinceOrm } from './province.orm-entity';
import { VillageOrm } from './village.orm-entity';
@Entity('district')
export class DistrictOrm {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  name_en: string;

  @ManyToOne(() => ProvinceOrm, (province) => province.districts)
  province: ProvinceOrm;

  @OneToMany(() => VillageOrm, (village) => village.district)
  villages: VillageOrm[];
}
