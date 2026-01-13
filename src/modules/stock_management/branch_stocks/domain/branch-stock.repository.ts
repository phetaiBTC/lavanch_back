import { EntityManager } from "typeorm";

export const BRANCH_STOCK_REPOSITORY = Symbol('BRANCH_STOCK_REPOSITORY');
export interface IBranchStockRepository {
  increase(
    manager: EntityManager,
    branchId: number,
    productVariantId: number,
    qty: number,
  ): Promise<void>;
}
