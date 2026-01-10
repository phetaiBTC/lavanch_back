import { StockTransferStatus } from 'src/database/typeorm/stock_transfers.orm-entity';
import { StockTransferItem } from './stock-transfer-item.entity';

export interface StockTransferProps {
  id?: number;
  fromBranchId: number;
  toBranchId: number;
  status: StockTransferStatus;
  items: StockTransferItem[];
  created_by: number;
  transfer_date: Date;
}

export class StockTransfer {
  readonly id?: number;
  readonly fromBranchId: number;
  readonly toBranchId: number;
  readonly created_by: number;
  private status: StockTransferStatus;
  private _transfer_date: Date;
  private readonly items: StockTransferItem[];

  constructor(props: StockTransferProps) {
    this.id = props.id;
    this._transfer_date = props.transfer_date;
    this.fromBranchId = props.fromBranchId;
    this.toBranchId = props.toBranchId;
    this.status = props.status;
    this.items = props.items;
    this.created_by = props.created_by;
  }

  // approve() {
  //   if (this.status !== StockTransferStatus.PENDING) {
  //     throw new Error('Only pending transfer can be approved');
  //   }

  //   this.status = StockTransferStatus.SUCCESS;
  // }

  receiveItem(itemId: number, qty: number) {
    const item = this.items.find((i) => i.id === itemId);
    if (!item) throw new Error('Transfer item not found');

    item.receive(qty);

    // if (this.items.every((i) => i.isFullyReceived())) {
    //   this.status = StockTransferStatus.SUCCESS;
    // }
    if (this.items.every((i) => i.isFullyReceived())) {
      this.status = StockTransferStatus.SUCCESS;
    } else {
      this.status = StockTransferStatus.PARTIAL;
    }
  }

  getStatus() {
    return this.status;
  }

  get transferDate() {
    return this._transfer_date;
  }

  get getItems() {
    return this.items;
  }
}
