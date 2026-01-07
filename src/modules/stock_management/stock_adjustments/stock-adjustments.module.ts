import { Module } from '@nestjs/common';
import { BranchStocksModule } from '../branch_stocks/branch-stocks.module';
@Module({
  imports: [BranchStocksModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class StockAdjustmentsModule {}
