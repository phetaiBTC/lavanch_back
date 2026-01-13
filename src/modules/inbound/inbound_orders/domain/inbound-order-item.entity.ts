export interface InboundOrderItemProps {
  id?: number;
  // inboundOrderId: number;
  productVariantId: number;
  unitId: number;
  productLotId?: number;

  quantity: number;
  unitPrice: number;
  // piecesPerUnit: number;

  // receivedQuantity?: number;
}

export class InboundOrderItem {
  readonly id?: number;

  readonly inboundOrderId: number;
  readonly productVariantId: number;
  readonly unitId: number;
  readonly productLotId?: number;

  private quantity: number;
  private unitPrice: number;
  private piecesPerUnit: number;
  private _receivedQuantity: number = 0;

  constructor(props: InboundOrderItemProps) {
    if (props.quantity <= 0) {
      throw new Error('Quantity must be greater than zero');
    }
    if (props.unitPrice < 0) {
      throw new Error('Unit price cannot be negative');
    }

    this.id = props.id;
    // this.inboundOrderId = props.inboundOrderId;
    this.productVariantId = props.productVariantId;
    this.unitId = props.unitId;
    this.productLotId = props.productLotId;

    this.quantity = props.quantity;
    this.unitPrice = props.unitPrice;
    // this.piecesPerUnit = props.piecesPerUnit;
    // this._receivedQuantity = props.receivedQuantity ?? 0;
  }

  // ========================
  // Derived values
  // ========================
  get totalPrice(): number {
    return this.quantity * this.unitPrice;
  }

  get totalPieces(): number {
    return this.quantity * this.piecesPerUnit;
  }

  // ========================
  // Behavior
  // ========================
  // receive(quantity: number) {
  //   if (quantity <= 0) {
  //     throw new Error('Received quantity must be greater than zero');
  //   }
  //   if (this._receivedQuantity + quantity > this.quantity) {
  //     throw new Error('Received quantity exceeds ordered quantity');
  //   }
  //   this._receivedQuantity += quantity;
  // }
  receive(qty: number) {
    if (this._receivedQuantity + qty > this.quantity) {
      throw new Error('Receive quantity exceeds ordered quantity');
    }
    this._receivedQuantity += qty;
  }

  isFullyReceived() {
    return this._receivedQuantity === this.quantity;
  }

  updateQuantity(quantity: number) {
    if (quantity <= 0) {
      throw new Error('Quantity must be greater than zero');
    }
    this.quantity = quantity;
  }

  setPiecesPerUnit(piecesPerUnit: number) {
    if (piecesPerUnit <= 0) {
      throw new Error('Pieces per unit must be greater than zero');
    }
    this.piecesPerUnit = piecesPerUnit;
  }

  updateUnitPrice(price: number) {
    if (price < 0) {
      throw new Error('Unit price cannot be negative');
    }
    this.unitPrice = price;
  }

  // ========================
  // Getters
  // ========================
  get getQuantity() {
    return this.quantity;
  }

  get getUnitPrice() {
    return this.unitPrice;
  }

  get getReceivedQuantity() {
    return this._receivedQuantity;
  }
}
