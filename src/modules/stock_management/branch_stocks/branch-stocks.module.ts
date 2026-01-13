import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Branch_stocksOrm } from 'src/database/typeorm/branch_stocks.orm-entity';
import { BRANCH_STOCK_REPOSITORY } from './domain/branch-stock.repository';
import { BranchStockRepositoryImpl } from './infrastructure/branch-stock.repository.impl';
import { BranchStockMapper } from './infrastructure/branch-stock.mapper';
@Module({
  imports: [TypeOrmModule.forFeature([Branch_stocksOrm])],
  controllers: [],
  providers: [
    {
      provide: BRANCH_STOCK_REPOSITORY,
      useClass: BranchStockRepositoryImpl,
    },
    BranchStockMapper,
  ],
  exports: [
    {
      provide: BRANCH_STOCK_REPOSITORY,
      useClass: BranchStockRepositoryImpl,
    },
  ],
})
export class BranchStocksModule {}
