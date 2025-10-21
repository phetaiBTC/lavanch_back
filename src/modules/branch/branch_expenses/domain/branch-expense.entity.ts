import { BranchExpenseProps } from '../interface/branch-expense.interface';

export class BranchExpense {
  private id?: number;
  private expense_no: string;
  private branch_id: number;
  private expense_category_id: number;
  private amount: number;
  private currency_id: number;
  private expense_date: Date;
  private description?: string;
  private notes?: string;
  private receipt_image?: string;
  private created_by: number;
  private approved_by?: number;
  private status: string;
  private wallet_transaction_id?: number;
  private createdAt: Date;
  private updatedAt: Date;
  private deletedAt: Date | null;

  constructor(props: BranchExpenseProps) {
    this.id = props.id;
    this.expense_no = props.expense_no;
    this.branch_id = props.branch_id;
    this.expense_category_id = props.expense_category_id;
    this.amount = props.amount;
    this.currency_id = props.currency_id ?? 1;
    this.expense_date = props.expense_date;
    this.description = props.description;
    this.notes = props.notes;
    this.receipt_image = props.receipt_image;
    this.created_by = props.created_by;
    this.approved_by = props.approved_by;
    this.status = props.status ?? 'PENDING';
    this.wallet_transaction_id = props.wallet_transaction_id;
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
    this.deletedAt = props.deletedAt ?? null;
  }

  get value() {
    return {
      id: this.id,
      expense_no: this.expense_no,
      branch_id: this.branch_id,
      expense_category_id: this.expense_category_id,
      amount: this.amount,
      currency_id: this.currency_id,
      expense_date: this.expense_date,
      description: this.description,
      notes: this.notes,
      receipt_image: this.receipt_image,
      created_by: this.created_by,
      approved_by: this.approved_by,
      status: this.status,
      wallet_transaction_id: this.wallet_transaction_id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }

  approve(approvedBy: number, walletTransactionId: number): BranchExpense {
    return new BranchExpense({
      ...this.value,
      status: 'APPROVED',
      approved_by: approvedBy,
      wallet_transaction_id: walletTransactionId,
      updatedAt: new Date(),
    });
  }

  reject(approvedBy: number): BranchExpense {
    return new BranchExpense({
      ...this.value,
      status: 'REJECTED',
      approved_by: approvedBy,
      updatedAt: new Date(),
    });
  }
}
