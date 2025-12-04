import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Index
} from 'typeorm';
import { BranchExpense } from './branch-expense.entity';

@Entity('expense_categories')
@Index(['code'], { unique: true })
export class ExpenseCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: true })
  code: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  // Relations
  @OneToMany(() => BranchExpense, (expense) => expense.expenseCategory)
  expenses: BranchExpense[];
}