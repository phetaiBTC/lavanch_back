import { IBranchStockProps } from '../interface/branch-stocks.interface';

export class BranchStock {
  readonly branchId: number;
  readonly productVariantId: number;
  private quantity: number;
  private reservedQuantity: number;
  constructor(props: IBranchStockProps) {
    this.branchId = props.branchId;
    this.productVariantId = props.productVariantId;
    this.quantity = props.quantity;
    this.reservedQuantity = props.reservedQuantity;
  }

  // ===== Queries =====
  get availableQuantity(): number {
    return this.quantity - this.reservedQuantity;
  }

  get currentQuantity(): number {
    return this.quantity;
  }

  // ===== Commands =====
  increase(qty: number) {
    if (qty <= 0) {
      throw new Error('Increase quantity must be greater than zero');
    }
    this.quantity += qty;
  }

  decrease(qty: number) {
    if (qty <= 0) {
      throw new Error('Decrease quantity must be greater than zero');
    }
    if (this.availableQuantity < qty) {
      throw new Error('Insufficient stock');
    }
    this.quantity -= qty;
  }

  reserve(qty: number) {
    if (qty <= 0) {
      throw new Error('Reserve quantity must be greater than zero');
    }
    if (this.availableQuantity < qty) {
      throw new Error('Insufficient available stock');
    }
    this.reservedQuantity += qty;
  }

  release(qty: number) {
    if (qty <= 0) {
      throw new Error('Release quantity must be greater than zero');
    }
    if (this.reservedQuantity < qty) {
      throw new Error('Release quantity exceeds reserved');
    }
    this.reservedQuantity -= qty;
  }
}
