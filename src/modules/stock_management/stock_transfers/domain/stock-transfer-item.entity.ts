export interface StockTransferItemProps {
  id?: number;
  productVariantId: number;
  productLotId?: number;
  quantity: number;
  receivedQuantity: number;
}
export class StockTransferItem {
  readonly id?: number;
  readonly productVariantId: number;
  readonly productLotId?: number;
  readonly quantity: number;
  private receivedQuantity: number;
  constructor(props: StockTransferItemProps) {
    this.id = props.id;
    this.productVariantId = props.productVariantId;
    this.productLotId = props.productLotId;
    this.quantity = props.quantity;
    this.receivedQuantity = props.receivedQuantity;
  }
  receive(qty: number) {
    if (qty <= 0) throw new Error('Receive quantity must be > 0');
    if (this.receivedQuantity + qty > this.quantity) {
      throw new Error('Receive quantity exceeds transfer quantity');
    }
    this.receivedQuantity += qty;
  }

  getReceivedQuantity() {
    return this.receivedQuantity;
  }

  isFullyReceived(): boolean {
    return this.receivedQuantity === this.quantity;
  }
}
