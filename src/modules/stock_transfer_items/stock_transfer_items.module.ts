
  
  import { Module } from '@nestjs/common';
  import { Stock_transfer_itemsController } from './stock_transfer_items.controller';
  import { TypeOrmModule } from '@nestjs/typeorm';
  import { Stock_transfer_itemsOrm } from 'src/database/typeorm/stock_transfer_items.orm-entity';
  import { Stock_transfer_itemsRepositoryImpl } from './infrastructure/stock_transfer_items.repository.impl';
  import { STOCK_TRANSFER_ITEMS_REPOSITORY } from './domain/stock_transfer_items.repository';
  import { CreateStock_transfer_itemsUseCase } from './application/commands/create-Stock_transfer_items.usecase';
  import { UpdateStock_transfer_itemsUseCase } from './application/commands/update-Stock_transfer_items.usecase';
  import { GetOneStock_transfer_itemsUseCase } from './application/queries/getOne-Stock_transfer_items.usecase';
  import { GetStock_transfer_itemsUseCase } from './application/queries/get-Stock_transfer_items.usecase';
  import { HardDeleteStock_transfer_itemsUseCase } from './application/commands/hard-Stock_transfer_items.usecase';
  import { SoftDeleteStock_transfer_itemsUseCase } from './application/commands/soft-Stock_transfer_items.usecase';
  import { RestoreStock_transfer_itemsUseCase } from './application/commands/restore-Stock_transfer_items.usecase';
  
  @Module({
    imports: [TypeOrmModule.forFeature([Stock_transfer_itemsOrm])],
    controllers: [Stock_transfer_itemsController],
    providers: [
      {
        provide: STOCK_TRANSFER_ITEMS_REPOSITORY,
        useClass: Stock_transfer_itemsRepositoryImpl,
      },
      CreateStock_transfer_itemsUseCase,
      UpdateStock_transfer_itemsUseCase,
      GetOneStock_transfer_itemsUseCase,
      GetStock_transfer_itemsUseCase,
      HardDeleteStock_transfer_itemsUseCase,
      SoftDeleteStock_transfer_itemsUseCase,
      RestoreStock_transfer_itemsUseCase,
    ],
  })
  export class Stock_transfer_itemsModule {}
  
  
  