import { EntityManager } from 'typeorm';
import { StockMovement } from '../domain/stock-movement.entity';
import {
  StockMovementMapper,
  StockMovementResponse,
} from './stock-movement.mapper';
import { Stock_movementsOrm } from 'src/database/typeorm/stock_movements.orm-entity';
import { BranchesOrm } from 'src/database/typeorm/branches.orm-entity';
import { ProductVariantOrm } from 'src/database/typeorm/product-variant.orm-entity';
import { ProductLotOrm } from 'src/database/typeorm/product_lot.orm-entity';
import { UserOrm } from 'src/database/typeorm/user.orm-entity';
import { IStockMovementRepository } from '../domain/stock-movement.repository';

export class StockMovementRepositoryImpl implements IStockMovementRepository {
  constructor(private readonly mapper: StockMovementMapper) {}

  async save(
    manager: EntityManager,
    domain: StockMovement,
  ): Promise<{ message: string }> {
    const branch = await manager.findOneOrFail(BranchesOrm, {
      where: { id: domain.branchId },
    });
    const variant = await manager.findOneOrFail(ProductVariantOrm, {
      where: { id: domain.productVariantId },
    });
    const lot = await manager.findOneOrFail(ProductLotOrm, {
      where: { id: domain.productLotId },
    });
    const createdBy = await manager.findOneOrFail(UserOrm, {
      where: { id: domain.createdBy },
    });
    const data = this.mapper.toSchema(domain, {
      branch,
      variant,
      lot,
      createdBy,
    });
    await manager.save(Stock_movementsOrm, data);

    return { message: 'Stock movement saved successfully' };
  }

  async findAllByBranch(
    manager: EntityManager,
    branchId: number,
  ): Promise<StockMovementResponse[]> {
    const ormList = await manager.find(Stock_movementsOrm, {
      where: { branch: { id: branchId } },
      relations: ['branch', 'product_variant', 'product_lot', 'created_by'],
      order: { movement_date: 'DESC' },
    });

    return ormList.map((orm) => this.mapper.toResponse(orm));
  }
}
