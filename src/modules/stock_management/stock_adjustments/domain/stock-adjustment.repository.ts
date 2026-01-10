import { EntityManager } from 'typeorm';
import { StockAdjustment } from './stock-adjustment.entity';

export const STOCK_ADJUCTMENT_REPOSITORY = Symbol(
  'STOCK_ADJUCTMENT_REPOSITORY',
);
export interface IStockAdjustmentRepository {
  save(
    manager: EntityManager,
    adjustment: StockAdjustment,
  ): Promise<{ message: string }>;
  findById(manager: EntityManager, id: number): Promise<StockAdjustment | null>;
  update(
    manager: EntityManager,
    adjustment: StockAdjustment,
  ): Promise<{ message: string }>;
}
