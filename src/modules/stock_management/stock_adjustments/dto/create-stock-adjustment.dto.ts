export class CreateStockAdjustmentItemDto {
  productVariantId: number;
  productLotId?: number;
  systemQuantity: number;
  actualQuantity: number;
}

export class CreateStockAdjustmentDto {
  branchId: number;
  adjustmentNo: string;
  description: string;
  createdBy: number;
  items: CreateStockAdjustmentItemDto[];
}
