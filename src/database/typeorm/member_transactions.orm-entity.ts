import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ShardOrm } from 'src/shared/typeorm/base.orm-entity';
import { MembersOrm } from './members.orm-entity';
import { BranchesOrm } from './branches.orm-entity';

@Entity('member_transactions')
export class MemberTransactionsOrm extends ShardOrm {
  @Column({ nullable: false })
  member_id: number;

  @ManyToOne(() => MembersOrm, (member) => member.transactions, {
    nullable: false,
  })
  @JoinColumn({ name: 'member_id' })
  member: MembersOrm;

  @Column({ nullable: false })
  branch_id: number;

  @ManyToOne(() => BranchesOrm, { nullable: false })
  @JoinColumn({ name: 'branch_id' })
  branch: BranchesOrm;

  @Column({ nullable: true })
  sale_id: number;

  @Column({
    type: 'enum',
    enum: ['EARN', 'REDEEM', 'REFUND', 'ADJUSTMENT'],
    nullable: false,
  })
  type: string;

  @Column({
    type: 'decimal',
    precision: 15,
    scale: 2,
    default: 0,
    nullable: false,
  })
  total_amount: number;

  @Column({
    type: 'decimal',
    precision: 15,
    scale: 2,
    default: 0,
    nullable: false,
  })
  points_earned: number;

  @Column({
    type: 'decimal',
    precision: 15,
    scale: 2,
    default: 0,
    nullable: false,
  })
  points_redeemed: number;

  @Column({
    type: 'decimal',
    precision: 15,
    scale: 2,
    default: 0,
    nullable: false,
  })
  points_balance: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Column({ type: 'text', nullable: true })
  notes: string;
}
