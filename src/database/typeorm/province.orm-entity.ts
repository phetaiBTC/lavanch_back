import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { DistrictOrm } from './district.orm-entity';
@Entity('province')
export class ProvinceOrm {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  name_en: string;
  @OneToMany(() => DistrictOrm, (district) => district.province)
  districts: DistrictOrm[];
}
