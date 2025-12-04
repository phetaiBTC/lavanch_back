import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { DistrictOrm } from './district.orm-entity';
import { SuppliersOrm } from './suppliers.orm-entity';
@Entity('village')
export class VillageOrm {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  name_en: string;

  @ManyToOne(() => DistrictOrm, (district) => district.villages)
  district: DistrictOrm;

  @OneToMany(() => SuppliersOrm, (suppliers) => suppliers.village)
  suppliers: SuppliersOrm[];
}
