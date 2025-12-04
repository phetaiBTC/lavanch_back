import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Branch } from './branch.entity';

@Entity('shifts')
export class Shift {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  start_time: string;

  @Column({ type: 'varchar', length: 50 })
  end_time: string;

  // Relations
  @OneToMany(() => Branch, (branch) => branch.shift)
  branches: Branch[];
}