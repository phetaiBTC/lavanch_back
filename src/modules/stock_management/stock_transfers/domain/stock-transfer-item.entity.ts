interface StockTransferItemProps {
  id?: number;
  productVariantId: number;
  productLotId?: number;
  quantity: number;
  receivedQuantity: number;
  // stockTransferId: number;
}

export class StockTransferItem {
  readonly id?: number;
  readonly productVariantId: number;
  readonly productLotId?: number;
  readonly quantity: number;
  private receivedQuantity: number;
  // private _stockTransferId: number;

  constructor(props: StockTransferItemProps) {
    this.id = props.id;
    this.productVariantId = props.productVariantId;
    this.productLotId = props.productLotId;
    this.quantity = props.quantity;
    // this._stockTransferId = props.stockTransferId;
    this.receivedQuantity = props.receivedQuantity;
  }

  receive(qty: number) {
    if (qty <= 0) throw new Error('Receive quantity must be > 0');
    if (this.receivedQuantity + qty > this.quantity) {
      throw new Error('Receive quantity exceeds transfer quantity');
    }
    this.receivedQuantity += qty;
  }

  // get stockTransferId() {
  //   return this._stockTransferId;
  // }

  isFullyReceived(): boolean {
    return this.receivedQuantity === this.quantity;
  }

  get ReceivedQuantity() {
    return this.receivedQuantity;
  }
}
