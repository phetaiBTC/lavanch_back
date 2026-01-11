import { Module } from '@nestjs/common';
import { StockTransferMapper } from './infrastructure/stock-transfer.mapper';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stock_transfersOrm } from 'src/database/typeorm/stock_transfers.orm-entity';
import { Stock_transfer_itemsOrm } from 'src/database/typeorm/stock_transfer_items.orm-entity';
import { StockTransfersController } from './stock-transfers.controller';
import { StockTransferRepositoryImpl } from './infrastructure/stock-transfer.repository.impl';
import { STOCK_TRANSFER_REPOSITORY } from './domain/stock-transfer.repository';
import { CreateStockTransferUseCase } from './application/commands/create-stock-transfer.usecase';
import { ApproveStockTransferUseCase } from './application/commands/approve-stock-transfer.usecase';
import { ReceiveStockTransferUseCase } from './application/commands/receive-stock-transfer.usecase';
import { TransactionService } from 'src/shared/utils/transaction.util';
@Module({
  imports: [
    TypeOrmModule.forFeature([Stock_transfersOrm, Stock_transfer_itemsOrm]),
  ],
  controllers: [StockTransfersController],
  providers: [
    {
      provide: STOCK_TRANSFER_REPOSITORY,
      useClass: StockTransferRepositoryImpl,
    },
    StockTransferMapper,
    CreateStockTransferUseCase,
    ApproveStockTransferUseCase,
    ReceiveStockTransferUseCase,
    TransactionService,
  ],
  exports: [],
})
export class StockTransfersModule {}
