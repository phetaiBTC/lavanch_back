export interface BranchStockResponse {
  id: number;
  branch: any;
  variant: any;
  quantity: number;
  reservedQuantity: number;
}

export interface IBranchStockProps {
  branchId: number;
  productVariantId: number;
  quantity: number;
  reservedQuantity: number;
}
