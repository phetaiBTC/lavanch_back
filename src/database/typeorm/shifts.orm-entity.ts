import { Entity, Column, OneToMany } from 'typeorm';
import { ShardOrm } from 'src/shared/typeorm/base.orm-entity';
import { BranchesOrm } from './branches.orm-entity';

@Entity('shifts')
export class ShiftsOrm extends ShardOrm {
  @Column({ type: 'varchar', length: 255 })
  start_time: string;

  @Column({ type: 'varchar', length: 255 })
  end_time: string;

  @OneToMany(() => BranchesOrm, (branch) => branch.shift)
  branches: BranchesOrm[];
}
