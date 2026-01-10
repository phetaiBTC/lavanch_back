export interface StockAdjustmentItemProps {
  id?: number;
  productVariantId: number;
  productLotId?: number;
  systemQuantity: number;
  actualQuantity: number;
}
export class StockAdjustmentItem {
  readonly id?: number;
  readonly productVariantId: number;
  readonly productLotId?: number;
  readonly systemQuantity: number;
  readonly actualQuantity: number;
  constructor(props: StockAdjustmentItemProps) {
    this.id = props.id;
    this.productVariantId = props.productVariantId;
    this.productLotId = props.productLotId;
    this.systemQuantity = props.systemQuantity;
    this.actualQuantity = props.actualQuantity;
  }

  get difference(): number {
    return this.actualQuantity - this.systemQuantity;
  }
}
