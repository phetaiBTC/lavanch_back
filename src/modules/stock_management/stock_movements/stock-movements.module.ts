import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stock_movementsOrm } from 'src/database/typeorm/stock_movements.orm-entity';
import { TransactionService } from 'src/shared/utils/transaction.util';
import { STOCK_MOVEMENT_REPOSITORY } from './domain/stock-movement.repository';
import { StockMovementRepositoryImpl } from './infrastructure/stock-movement.repository.impl';
import { CreateStockMovementUseCase } from './application/commands/create-stock-movement.usecase';
import { StockMovementMapper } from './infrastructure/stock-movement.mapper';
@Module({
  imports: [TypeOrmModule.forFeature([Stock_movementsOrm])],
  providers: [
    {
      provide: STOCK_MOVEMENT_REPOSITORY,
      useClass: StockMovementRepositoryImpl,
    },
    TransactionService,
    CreateStockMovementUseCase,
    StockMovementMapper,
  ],
  exports: [
    {
      provide: STOCK_MOVEMENT_REPOSITORY,
      useClass: StockMovementRepositoryImpl,
    },
  ],
})
export class StockMovementsModule {}
