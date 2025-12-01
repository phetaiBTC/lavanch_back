import { Entity, Column, OneToMany } from 'typeorm';
import { ShardOrm } from 'src/shared/typeorm/base.orm-entity';
import { MembersOrm } from './members.orm-entity';

@Entity('member_tiers')
export class MemberTiersOrm extends ShardOrm {
  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0, nullable: false })
  min_spending: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0, nullable: false })
  discount_percent: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 1, nullable: false })
  points_multiplier: number;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @OneToMany(() => MembersOrm, (member) => member.tier)
  members: MembersOrm[];
}
