import { WalletAdjustmentProps } from '../interface/wallet-adjustment.interface';
import {
  AdjustmentTypeEnum,
  AdjustmentReasonEnum,
} from '../dto/create-wallet-adjustment.dto';

export class WalletAdjustment {
  private id?: number;
  private adjustment_no: string;
  private branch_id: number;
  private adjustment_type: AdjustmentTypeEnum;
  private amount: number;
  private reason: AdjustmentReasonEnum;
  private description?: string;
  private created_by: number;
  private approved_by?: number;
  private status: string;
  private wallet_transaction_id?: number;
  private adjustment_date: Date;
  private createdAt: Date;
  private updatedAt: Date;
  private deletedAt: Date | null;

  constructor(props: WalletAdjustmentProps) {
    this.id = props.id;
    this.adjustment_no = props.adjustment_no;
    this.branch_id = props.branch_id;
    this.adjustment_type = props.adjustment_type;
    this.amount = props.amount;
    this.reason = props.reason;
    this.description = props.description;
    this.created_by = props.created_by;
    this.approved_by = props.approved_by;
    this.status = props.status ?? 'PENDING';
    this.wallet_transaction_id = props.wallet_transaction_id;
    this.adjustment_date = props.adjustment_date ?? new Date();
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
    this.deletedAt = props.deletedAt ?? null;
  }

  get value() {
    return {
      id: this.id,
      adjustment_no: this.adjustment_no,
      branch_id: this.branch_id,
      adjustment_type: this.adjustment_type,
      amount: this.amount,
      reason: this.reason,
      description: this.description,
      created_by: this.created_by,
      approved_by: this.approved_by,
      status: this.status,
      wallet_transaction_id: this.wallet_transaction_id,
      adjustment_date: this.adjustment_date,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }

  approve(approvedBy: number, walletTransactionId: number): WalletAdjustment {
    return new WalletAdjustment({
      ...this.value,
      status: 'APPROVED',
      approved_by: approvedBy,
      wallet_transaction_id: walletTransactionId,
      updatedAt: new Date(),
    });
  }

  reject(approvedBy: number): WalletAdjustment {
    return new WalletAdjustment({
      ...this.value,
      status: 'REJECTED',
      approved_by: approvedBy,
      updatedAt: new Date(),
    });
  }
}
