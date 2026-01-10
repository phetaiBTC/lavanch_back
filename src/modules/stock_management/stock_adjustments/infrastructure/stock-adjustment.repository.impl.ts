import { Injectable } from '@nestjs/common';
import { Stock_adjustmentsOrm } from 'src/database/typeorm/stock_adjustments.orm-entity';
import { EntityManager } from 'typeorm';
import { IStockAdjustmentRepository } from '../domain/stock-adjustment.repository';
import { StockAdjustment } from '../domain/stock-adjustment.entity';
import { StockAdjustmentMapper } from './stock-adjustment.mapper';

@Injectable()
export class StockAdjustmentRepositoryImpl
  implements IStockAdjustmentRepository
{
  constructor(private mapper: StockAdjustmentMapper) {}

  async save(
    manager: EntityManager,
    adjustment: StockAdjustment,
  ): Promise<{ message: string }> {
    await manager.save(Stock_adjustmentsOrm, adjustment);
    return { message: 'Stock adjustment saved successfully' };
  }

  async findById(
    manager: EntityManager,
    id: number,
  ): Promise<StockAdjustment | null> {
    const orm = await manager.findOneOrFail(Stock_adjustmentsOrm, {
      where: { id },
      relations: ['items'],
    });

    return this.mapper.toDomain(orm);
  }

  async update(
    manager: EntityManager,
    adjustment: StockAdjustment,
  ): Promise<{ message: string }> {
    await manager.update(
      Stock_adjustmentsOrm,
      { id: adjustment.id },
      adjustment,
    );
    return { message: 'Stock adjustment updated successfully' };
  }
}
