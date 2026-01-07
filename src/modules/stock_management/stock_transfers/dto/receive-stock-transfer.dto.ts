// receive-stock-transfer.dto.ts
export class ReceiveStockTransferDto {
  readonly transferId: number;
  readonly receivedBy: number;
  readonly items: {
    itemId: number; // StockTransferItem.id
    receivedQuantity: number;
  }[];
}
