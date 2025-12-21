
  
  import { Module } from '@nestjs/common';
  import { Stock_adjustment_itemsController } from './stock_adjustment_items.controller';
  import { TypeOrmModule } from '@nestjs/typeorm';
  import { Stock_adjustment_itemsOrm } from 'src/database/typeorm/stock_adjustment_items.orm-entity';
  import { Stock_adjustment_itemsRepositoryImpl } from './infrastructure/stock_adjustment_items.repository.impl';
  import { STOCK_ADJUSTMENT_ITEMS_REPOSITORY } from './domain/stock_adjustment_items.repository';
  import { CreateStock_adjustment_itemsUseCase } from './application/commands/create-stock_adjustment_items.usecase';
  import { UpdateStock_adjustment_itemsUseCase } from './application/commands/update-stock_adjustment_items.usecase';
  import { FindOneStock_adjustment_itemsUseCase } from './application/queries/getOne-stock_adjustment_items.usecase';
  import { FindStock_adjustment_itemsUseCase } from './application/queries/get-stock_adjustment_items.usecase';
  import { HardDeleteStock_adjustment_itemsUseCase } from './application/commands/hard-stock_adjustment_items.usecase';
  import { SoftDeleteStock_adjustment_itemsUseCase } from './application/commands/soft-stock_adjustment_items.usecase';
  import { RestoreStock_adjustment_itemsUseCase } from './application/commands/restore-stock_adjustment_items.usecase';
  
  @Module({
    imports: [TypeOrmModule.forFeature([Stock_adjustment_itemsOrm])],
    controllers: [Stock_adjustment_itemsController],
    providers: [
      {
        provide: STOCK_ADJUSTMENT_ITEMS_REPOSITORY,
        useClass: Stock_adjustment_itemsRepositoryImpl,
      },
      CreateStock_adjustment_itemsUseCase,
      UpdateStock_adjustment_itemsUseCase,
      FindOneStock_adjustment_itemsUseCase,
      FindStock_adjustment_itemsUseCase,
      HardDeleteStock_adjustment_itemsUseCase,
      SoftDeleteStock_adjustment_itemsUseCase,
      RestoreStock_adjustment_itemsUseCase,
    ],
  })
  export class Stock_adjustment_itemsModule {}
  
  
  