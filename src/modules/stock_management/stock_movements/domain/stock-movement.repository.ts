import { EntityManager } from 'typeorm';
import { StockMovement } from './stock-movement.entity';
import { StockMovementResponse } from '../infrastructure/stock-movement.mapper';

export const STOCK_MOVEMENT_REPOSITORY = Symbol('STOCK_MOVEMENT_REPOSITORY');
export interface IStockMovementRepository {
  save(
    manager: EntityManager,
    domain: StockMovement,
  ): Promise<{ message: string }>;

  findAllByBranch(
    manager: EntityManager,
    branchId: number,
  ): Promise<StockMovementResponse[]>;
}
