import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { ShardOrm } from 'src/shared/typeorm/base.orm-entity';
import { BranchesOrm } from './branches.orm-entity';
import { UserOrm } from './user.orm-entity';

export enum TransactionType {
  DEPOSIT = 'DEPOSIT',
  WITHDRAW = 'WITHDRAW',
  TRANSFER_IN = 'TRANSFER_IN',
  TRANSFER_OUT = 'TRANSFER_OUT',
  ADJUSTMENT = 'ADJUSTMENT',
  SALE = 'SALE',
  EXPENSE = 'EXPENSE',
  REFUND = 'REFUND',
}

export enum TransactionStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

@Entity('wallet_transactions')
export class WalletTransactionsOrm extends ShardOrm {
  @Column({ nullable: false })
  branch_id: number;

  @ManyToOne(() => BranchesOrm, (branch) => branch.wallet_transactions, {
    nullable: false,
  })
  @JoinColumn({ name: 'branch_id' })
  branch: BranchesOrm;

  @Column({ type: 'enum', enum: TransactionType, nullable: false })
  transaction_type: TransactionType;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: false })
  amount: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: false })
  balance_before: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: false })
  balance_after: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  reference_type: string;

  @Column({ type: 'int', nullable: true })
  reference_id: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  reference_no: string;

  @Column({ nullable: true })
  related_branch_id: number;

  @ManyToOne(() => BranchesOrm, (branch) => branch.related_transactions, {
    nullable: true,
  })
  @JoinColumn({ name: 'related_branch_id' })
  related_branch: BranchesOrm;

  @Column({ type: 'int', nullable: true })
  related_transaction_id: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

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
    enum: TransactionStatus,
    default: TransactionStatus.COMPLETED,
  })
  status: TransactionStatus;

  @CreateDateColumn()
  transaction_date: Date;
}
