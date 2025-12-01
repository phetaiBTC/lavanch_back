import { Entity, Column, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { ShardOrm } from 'src/shared/typeorm/base.orm-entity';
import { MembersOrm } from './members.orm-entity';
import { BranchesOrm } from './branches.orm-entity';

@Entity('member_points')
@Unique(['member_id', 'branch_id'])
export class MemberPointsOrm extends ShardOrm {
  @Column({ nullable: false })
  member_id: number;

  @ManyToOne(() => MembersOrm, (member) => member.member_points, { nullable: false })
  @JoinColumn({ name: 'member_id' })
  member: MembersOrm;

  @Column({ nullable: false })
  branch_id: number;

  @ManyToOne(() => BranchesOrm, { nullable: false })
  @JoinColumn({ name: 'branch_id' })
  branch: BranchesOrm;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0, nullable: false })
  points: number;
}
