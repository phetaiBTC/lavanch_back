import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { ShardOrm } from 'src/shared/typeorm/base.orm-entity';
import { MemberTiersOrm } from './member_tiers.orm-entity';
import { BranchesOrm } from './branches.orm-entity';
import { MemberPointsOrm } from './member_points.orm-entity';
import { MemberTransactionsOrm } from './member_transactions.orm-entity';

@Entity('members')
export class MembersOrm extends ShardOrm {
  @Column({ type: 'varchar', length: 20, unique: true, nullable: false })
  member_no: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  phone: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email: string;

  @Column({ type: 'date', nullable: true })
  birthday: Date;

  @Column({ type: 'enum', enum: ['MALE', 'FEMALE', 'OTHER'], nullable: true })
  gender: string;

  @Column({ nullable: true })
  tier_id: number;

  @ManyToOne(() => MemberTiersOrm, (tier) => tier.members, { nullable: true })
  @JoinColumn({ name: 'tier_id' })
  tier: MemberTiersOrm;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0, nullable: false })
  total_spending: number;

  @Column({ nullable: true })
  registered_branch_id: number;

  @ManyToOne(() => BranchesOrm, { nullable: true })
  @JoinColumn({ name: 'registered_branch_id' })
  registered_branch: BranchesOrm;

  @OneToMany(() => MemberPointsOrm, (points) => points.member)
  member_points: MemberPointsOrm[];

  @OneToMany(() => MemberTransactionsOrm, (transaction) => transaction.member)
  transactions: MemberTransactionsOrm[];
}
