import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ShardOrm } from 'src/shared/typeorm/base.orm-entity';
import { PointNameCode } from 'src/shared/enum/point-name-code';

@Entity('Point')
export class PointOrm extends ShardOrm {

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 1.0 })
  points_multiplier: number;

  @Column({ type: 'enum', enum: PointNameCode })
  name_code: PointNameCode;
}
