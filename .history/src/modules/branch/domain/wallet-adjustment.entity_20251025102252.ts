import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  Index
} from 'typeorm';
import { Branch } from './branch.entity';
import { WalletTransaction } from './wallet-transaction.entity';

export enum AdjustmentType {
  ADD = 'ADD',
  DEDUCT = 'DEDUCT'
}

export enum AdjustmentReason {
  CORRECTION = 'CORRECTION',
  DEPOSIT = 'DEPOSIT',
  WITHDRAW = 'WITHDRAW',
  LOST = 'LOST',
  FOUND = 'FOUND'
}

export enum AdjustmentStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

@Entity('wallet_adjustments')
@Index(['adjustment_no'], { unique: true })
@Index(['branch_id'])
@Index(['status'])
@Index(['created_by'])
@Index(['approved_by'])
@Index(['adjustment_date'])
export class WalletAdjustment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, unique: true, nullable: false })
  adjustment_no: string;

  @Column({ type: 'int', nullable: false })
  branch_id: number;

  @Column({
    type: 'enum',
    enum: AdjustmentType,
    nullable: false
  })
  adjustment_type: AdjustmentType;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: false })
  amount: number;

  @Column({
    type: 'enum',
    enum: AdjustmentReason,
    nullable: false
  })
  reason: AdjustmentReason;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'int', nullable: false })
  created_by: number;

  @Column({ type: 'int', nullable: true })
  approved_by: number;

  @Column({
    type: 'enum',
    enum: AdjustmentStatus,
    default: AdjustmentStatus.PENDING
  })
  status: AdjustmentStatus;

  @Column({ type: 'int', nullable: true })
  wallet_transaction_id: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  adjustment_date: Date;

  @CreateDateColumn()
  created_at: Date;

  // Relations
  @ManyToOne(() => Branch, (branch) => branch.wallet_adjustments)
  @JoinColumn({ name: 'branch_id' })
  branch: Branch;

  @ManyToOne(() => WalletTransaction)
  @JoinColumn({ name: 'wallet_transaction_id' })
  walletTransaction: WalletTransaction;
}