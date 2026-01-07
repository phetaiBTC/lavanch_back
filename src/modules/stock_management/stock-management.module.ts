import { Module } from '@nestjs/common';
import { StockTransfersModule } from './stock_transfers/stock-transfers.module';
import { StockMovementsModule } from './stock_movements/stock-movements.module';
import { BranchStocksModule } from './branch_stocks/branch-stocks.module';
@Module({
  imports: [StockTransfersModule, StockMovementsModule, BranchStocksModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class StockManagementModule {}
