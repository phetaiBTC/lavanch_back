import { StockTransferItem } from './stock-transfer-item.entity';

export interface StockTransferProps {
  id?: number;
  fromBranchId: number;
  toBranchId: number;
  status: StockTransferStatus;
  items: StockTransferItem[];
}

export enum StockTransferStatus {
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
  SUCCESS = 'SUCCESS',
}

export class StockTransfer {
  readonly id?: number;
  readonly fromBranchId: number;
  readonly toBranchId: number;
  private status: StockTransferStatus;
  private readonly items: StockTransferItem[];
  constructor(props: StockTransferProps) {
    this.id = props.id;
    this.fromBranchId = props.fromBranchId;
    this.toBranchId = props.toBranchId;
    this.status = props.status;
    this.items = props.items;
  }

  approve() {
    if (this.status !== StockTransferStatus.PENDING) {
      throw new Error('Only pending transfer can be approved');
    }
  }

  receiveItem(itemId: number, qty: number) {
    const item = this.items.find((i) => i.id === itemId);
    if (!item) throw new Error('Transfer item not found');

    item.receive(qty);

    if (this.items.every((i) => i.isFullyReceived())) {
      this.status = StockTransferStatus.SUCCESS;
    }
  }

  getStatus() {
    return this.status;
  }

  getItems() {
    return this.items;
  }
}
