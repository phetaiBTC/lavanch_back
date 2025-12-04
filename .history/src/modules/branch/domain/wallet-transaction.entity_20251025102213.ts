import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  Index,
  OneToMany
} from 'typeorm';
import { Branch } from './branch.entity';

export enum TransactionType {
  DEPOSIT = 'DEPOSIT',
  WITHDRAW = 'WITHDRAW',
  TRANSFER_IN = 'TRANSFER_IN',
  TRANSFER_OUT = 'TRANSFER_OUT',
  ADJUSTMENT = 'ADJUSTMENT',
  SALE = 'SALE',
  EXPENSE = 'EXPENSE',
  REFUND = 'REFUND'
}

export enum TransactionStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

@Entity('wallet_transactions')
@Index(['branch_id'])
@Index(['related_branch_id'])
@Index(['created_by'])
@Index(['approved_by'])
@Index(['transaction_date'])
@Index(['status'])
@Index(['transaction_type'])
export class WalletTransaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: false })
  branch_id: number;

  @Column({
    type: 'enum',
    enum: TransactionType,
    nullable: false
  })
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

  @Column({ type: 'int', nullable: true })
  related_branch_id: number;

  @Column({ type: 'int', nullable: true })
  related_transaction_id: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ type: 'int', nullable: false })
  created_by: number;

  @Column({ type: 'int', nullable: true })
  approved_by: number;

  @Column({
    type: 'enum',
    enum: TransactionStatus,
    default: TransactionStatus.COMPLETED
  })
  status: TransactionStatus;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  transaction_date: Date;

  @CreateDateColumn()
  created_at: Date;

  // Relations
  @ManyToOne(() => Branch, (branch) => branch.wallet_transactions)
  @JoinColumn({ name: 'branch_id' })
  branch: Branch;

  @ManyToOne(() => Branch, (branch) => branch.related_transactions)
  @JoinColumn({ name: 'related_branch_id' })
  relatedBranch: Branch;

  @ManyToOne(() => WalletTransaction, (transaction) => transaction.relatedTransactions)
  @JoinColumn({ name: 'related_transaction_id' })
  relatedTransaction: WalletTransaction;

  @OneToMany(() => WalletTransaction, (transaction) => transaction.relatedTransaction)
  relatedTransactions: WalletTransaction[];
}