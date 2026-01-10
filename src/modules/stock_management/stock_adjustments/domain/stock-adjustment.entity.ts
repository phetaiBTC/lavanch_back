import { StockAdjustmentsStatus } from 'src/database/typeorm/stock_adjustments.orm-entity';
import { StockAdjustmentItem } from './stock-adjustment-item.entity';

export interface StockAdjustmentProps {
  id?: number;
  branchId: number;
  adjustmentNo: string;
  description: string;
  createdBy: number;
  status: StockAdjustmentsStatus;
  items: StockAdjustmentItem[];
//   createdAt: Date;
  approvedBy?: number;
}

export class StockAdjustment {
  readonly id?: number;
  readonly branchId: number;
  readonly adjustmentNo: string;
  readonly description: string;
  readonly createdBy: number;
  private _status: StockAdjustmentsStatus = StockAdjustmentsStatus.PENDING;
  readonly items: StockAdjustmentItem[] = [];
  readonly approvedBy?: number;
  constructor(props: StockAdjustmentProps) {
    this.id = props.id;
    this.branchId = props.branchId;
    this.adjustmentNo = props.adjustmentNo;
    this.description = props.description;
    this.createdBy = props.createdBy;
    this._status = props.status;
    this.items = props.items;
    // this.createdAt = props.createdAt;
    this.approvedBy = props.approvedBy;
  }

  get status() {
    return this._status;
  }

  approve(approvedBy: number) {
    if (this._status !== StockAdjustmentsStatus.PENDING) {
      throw new Error('StockAdjustment already approved');
    }
    this._status = StockAdjustmentsStatus.APPROVED;
    (this as any).approvedBy = approvedBy;
  }
}
