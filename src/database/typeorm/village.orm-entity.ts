import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { DistrictOrm } from './district.orm-entity';
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
}
