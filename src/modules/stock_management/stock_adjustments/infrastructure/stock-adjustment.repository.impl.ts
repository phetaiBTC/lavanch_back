import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Stock_adjustmentsOrm } from 'src/database/typeorm/stock_adjustments.orm-entity';
import { Repository } from 'typeorm';
import { IStockAdjustmentRepository } from '../domain/stock-adjustment.repository';
import { SelectQueryBuilder } from 'typeorm/browser';

@Injectable()
export class StockAdjustmentRepositoryImpl
  implements IStockAdjustmentRepository
{
  constructor(
    @InjectRepository(Stock_adjustmentsOrm)
    private readonly stockAdjustmentRepository: Repository<Stock_adjustmentsOrm>,
  ) {}

  createQuery(): SelectQueryBuilder<Stock_adjustmentsOrm> {
    return this.stockAdjustmentRepository.createQueryBuilder('branch_stock');
  }
}
