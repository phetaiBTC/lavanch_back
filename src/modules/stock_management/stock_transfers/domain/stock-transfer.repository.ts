import { EntityManager } from 'typeorm';
import { StockTransfer } from './stock-transfer.entity';

export const STOCK_TRANSFER_REPOSITORY = Symbol('STOCK_TRANSFER_REPOSITORY');
export interface IStockTransferRepository {
  save(
    manager: EntityManager,
    domain: StockTransfer,
  ): Promise<void>;

  findById(manager: EntityManager, id: number): Promise<StockTransfer>;
}
