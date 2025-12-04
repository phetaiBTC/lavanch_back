import { WalletTransactionProps } from '../interface/wallet-transaction.interface';

export class WalletTransaction {
  private id?: number;
  private branch_id: number;
  private transaction_type: string;
  private amount: number;
  private balance_before: number;
  private balance_after: number;
  private reference_type?: string;
  private reference_id?: number;
  private reference_no?: string;
  private related_branch_id?: number;
  private related_transaction_id?: number;
  private description?: string;
  private notes?: string;
  private created_by: number;
  private approved_by?: number;
  private status: string;
  private transaction_date: Date;
  private createdAt: Date;
  private updatedAt: Date;
  private deletedAt: Date | null;

  constructor(props: WalletTransactionProps) {
    this.id = props.id;
    this.branch_id = props.branch_id;
    this.transaction_type = props.transaction_type;
    this.amount = props.amount;
    this.balance_before = props.balance_before;
    this.balance_after = props.balance_after;
    this.reference_type = props.reference_type;
    this.reference_id = props.reference_id;
    this.reference_no = props.reference_no;
    this.related_branch_id = props.related_branch_id;
    this.related_transaction_id = props.related_transaction_id;
    this.description = props.description;
    this.notes = props.notes;
    this.created_by = props.created_by;
    this.approved_by = props.approved_by;
    this.status = props.status ?? 'COMPLETED';
    this.transaction_date = props.transaction_date ?? new Date();
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
    this.deletedAt = props.deletedAt ?? null;
  }

  get value() {
    return {
      id: this.id,
      branch_id: this.branch_id,
      transaction_type: this.transaction_type,
      amount: this.amount,
      balance_before: this.balance_before,
      balance_after: this.balance_after,
      reference_type: this.reference_type,
      reference_id: this.reference_id,
      reference_no: this.reference_no,
      related_branch_id: this.related_branch_id,
      related_transaction_id: this.related_transaction_id,
      description: this.description,
      notes: this.notes,
      created_by: this.created_by,
      approved_by: this.approved_by,
      status: this.status,
      transaction_date: this.transaction_date,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }
}
