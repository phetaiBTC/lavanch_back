import { Injectable } from '@nestjs/common';
import { IBranchStockRepository } from '../domain/branch-stock.repository';
import { Branch_stocksOrm } from 'src/database/typeorm/branch_stocks.orm-entity';
import { EntityManager, Repository } from 'typeorm';
import { BranchStock } from '../domain/branch-stock.entity';
import { BranchStockMapper } from './branch-stock.mapper';
import { BranchStockResponse } from '../interface/branch-stocks.interface';

@Injectable()
export class BranchStockRepositoryImpl implements IBranchStockRepository {
  constructor(private readonly branchStockMapper: BranchStockMapper) {}
  async findByBranchAndVariant(
    manager: EntityManager,
    branchId: number,
    variantId: number,
  ): Promise<BranchStockResponse | null> {
    const orm = await manager.findOneOrFail(Branch_stocksOrm, {
      where: {
        branch: { id: branchId },
        variant: { id: variantId },
      },
      relations: ['branch', 'variant'],
    });
    return this.branchStockMapper.toResponse(orm);
  }

  async save(
    manager: EntityManager,
    stock: BranchStock,
  ): Promise<{ message: string }> {
    const orm = manager.create(Branch_stocksOrm, {
      branch: { id: stock.branchId },
      variant: { id: stock.productVariantId },
      quantity: stock.currentQuantity,
      reserved_quantity: (stock as any).reservedQuantity,
    });
    await manager.save(orm);
    return { message: 'Stock saved successfully' };
  }

  async getOrCreate(
    manager: EntityManager,
    branchId: number,
    productVariantId: number,
  ): Promise<Branch_stocksOrm> {
    const orm = await manager.findOne(Branch_stocksOrm, {
      where: {
        branch: { id: branchId },
        variant: { id: productVariantId },
      },
    });
    if (orm) return orm;
    return manager.create(Branch_stocksOrm, {
      branch: { id: branchId },
      variant: { id: productVariantId },
      quantity: 0,
      reserved_quantity:0
    })
  }

  async increase(
    manager: EntityManager,
    branchId: number,
    productVariantId: number,
    qty: number,
  ): Promise<void> {
    const orm = await this.getOrCreate(manager, branchId, productVariantId);
    orm.quantity += qty;
    await manager.save(orm);
  }
}
