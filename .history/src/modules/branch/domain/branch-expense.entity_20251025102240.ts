import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index
} from 'typeorm';
import { Branch } from './branch.entity';
import { ExpenseCategory } from './expense-category.entity';
import { WalletTransaction } from './wallet-transaction.entity';

export enum ExpenseStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

@Entity('branch_expenses')
@Index(['expense_no'], { unique: true })
@Index(['branch_id'])
@Index(['expense_category_id'])
@Index(['expense_date'])
@Index(['status'])
@Index(['created_by'])
@Index(['approved_by'])
export class BranchExpense {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, unique: true, nullable: false })
  expense_no: string;

  @Column({ type: 'int', nullable: false })
  branch_id: number;

  @Column({ type: 'int', nullable: false })
  expense_category_id: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: false })
  amount: number;

  @Column({ type: 'int', default: 1 })
  currency_id: number;

  @Column({ type: 'date', nullable: false })
  expense_date: Date;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  receipt_image: string;

  @Column({ type: 'int', nullable: false })
  created_by: number;

  @Column({ type: 'int', nullable: true })
  approved_by: number;

  @Column({
    type: 'enum',
    enum: ExpenseStatus,
    default: ExpenseStatus.PENDING
  })
  status: ExpenseStatus;

  @Column({ type: 'int', nullable: true })
  wallet_transaction_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Relations
  @ManyToOne(() => Branch, (branch) => branch.expenses)
  @JoinColumn({ name: 'branch_id' })
  branch: Branch;

  @ManyToOne(() => ExpenseCategory, (category) => category.expenses)
  @JoinColumn({ name: 'expense_category_id' })
  expenseCategory: ExpenseCategory;

  @ManyToOne(() => WalletTransaction)
  @JoinColumn({ name: 'wallet_transaction_id' })
  walletTransaction: WalletTransaction;
}