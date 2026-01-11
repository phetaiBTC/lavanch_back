import { Module } from '@nestjs/common';
import { BranchStocksModule } from '../branch_stocks/branch-stocks.module';
import { STOCK_ADJUCTMENT_REPOSITORY } from './domain/stock-adjustment.repository';
import { StockAdjustmentRepositoryImpl } from './infrastructure/stock-adjustment.repository.impl';
import { StockAdjustmentMapper } from './infrastructure/stock-adjustment.mapper';
@Module({
  imports: [BranchStocksModule],
  controllers: [],
  providers: [
    {
      provide: STOCK_ADJUCTMENT_REPOSITORY,
      useClass: StockAdjustmentRepositoryImpl,
    },
    StockAdjustmentMapper,
  ],
  exports: [],
})
export class StockAdjustmentsModule {}
