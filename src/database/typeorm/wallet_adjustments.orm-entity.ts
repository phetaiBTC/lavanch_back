import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
  CreateDateColumn,
} from 'typeorm';
import { ShardOrm } from 'src/shared/typeorm/base.orm-entity';
import { BranchesOrm } from './branches.orm-entity';
import { UserOrm } from './user.orm-entity';
import { WalletTransactionsOrm } from './wallet_transactions.orm-entity';

export enum AdjustmentType {
  ADD = 'ADD',
  DEDUCT = 'DEDUCT',
}

export enum AdjustmentReason {
  CORRECTION = 'CORRECTION',
  DEPOSIT = 'DEPOSIT',
  WITHDRAW = 'WITHDRAW',
  LOST = 'LOST',
  FOUND = 'FOUND',
}

export enum AdjustmentStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

@Entity('wallet_adjustments')
export class WalletAdjustmentsOrm extends ShardOrm {
  @Column({ type: 'varchar', length: 100, unique: true, nullable: false })
  adjustment_no: string;

  @Column({ nullable: false })
  branch_id: number;

  @ManyToOne(() => BranchesOrm, (branch) => branch.wallet_adjustments, {
    nullable: false,
  })
  @JoinColumn({ name: 'branch_id' })
  branch: BranchesOrm;

  @Column({ type: 'enum', enum: AdjustmentType, nullable: false })
  adjustment_type: AdjustmentType;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: false })
  amount: number;

  @Column({ type: 'enum', enum: AdjustmentReason, nullable: false })
  reason: AdjustmentReason;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: false })
  created_by: number;

  @ManyToOne(() => UserOrm, { nullable: false })
  @JoinColumn({ name: 'created_by' })
  creator: UserOrm;

  @Column({ nullable: true })
  approved_by: number;

  @ManyToOne(() => UserOrm, { nullable: true })
  @JoinColumn({ name: 'approved_by' })
  approver: UserOrm;

  @Column({
    type: 'enum',
    enum: AdjustmentStatus,
    default: AdjustmentStatus.PENDING,
  })
  status: AdjustmentStatus;

  @Column({ nullable: true })
  wallet_transaction_id: number;

  @OneToOne(() => WalletTransactionsOrm, { nullable: true })
  @JoinColumn({ name: 'wallet_transaction_id' })
  wallet_transaction: WalletTransactionsOrm;

  @CreateDateColumn()
  adjustment_date: Date;
}
