import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inbound_order_itemsOrm } from 'src/database/typeorm/inbound_order_items.orm-entity';
import { Inbound_ordersOrm } from 'src/database/typeorm/inbound_orders.orm-entity';
import { InboundOrdersController } from './inbound-orders.controller';
import { InboundOrderRepositoryImpl } from './infrastructure/inbound-order.repository.impl';
import { INBOUND_ORDER_REPOSITORY } from './domain/inbound-order.repository';
import { CreateInboundOrderUseCase } from './application/commands/create-inbound-order.usecase';
import { ReceiveInboundOrderUseCase } from './application/commands/receive-inbound-order.usecase';
import { InboundOrderMapper } from './infrastructure/inbound.mapper';
import { TransactionService } from 'src/shared/utils/transaction.util';
import { StockMovementsModule } from 'src/modules/stock_management/stock_movements/stock-movements.module';
import { UnitOrm } from 'src/database/typeorm/unit.orm-entity';
import { CurrenciesOrm } from 'src/database/typeorm/currencies.orm-entity';
import { ProductLotOrm } from 'src/database/typeorm/product_lot.orm-entity';
import { ProductUnitOrm } from 'src/database/typeorm/product-unit.orm-entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([Inbound_ordersOrm, Inbound_order_itemsOrm,UnitOrm,CurrenciesOrm,ProductLotOrm,ProductUnitOrm]),
    StockMovementsModule
  ],
  controllers: [InboundOrdersController],
  providers: [
    {
      provide: INBOUND_ORDER_REPOSITORY,
      useClass: InboundOrderRepositoryImpl,
    },
    CreateInboundOrderUseCase,
    ReceiveInboundOrderUseCase,
    InboundOrderMapper,
    TransactionService
  ],
  exports: [],
})
export class InboundOrdersModule {}
