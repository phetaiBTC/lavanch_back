
  
  import { Module } from '@nestjs/common';
  import { Inbound_order_itemsController } from './inbound_order_items.controller';
  import { TypeOrmModule } from '@nestjs/typeorm';
  import { Inbound_order_itemsOrm } from 'src/database/typeorm/inbound_order_items.orm-entity';
  import { Inbound_order_itemsRepositoryImpl } from './infrastructure/inbound_order_items.repository.impl';
  import { INBOUND_ORDER_ITEMS_REPOSITORY } from './domain/inbound_order_items.repository';
  import { CreateInbound_order_itemsUseCase } from './application/commands/create-inbound_order_items.usecase';
  import { UpdateInbound_order_itemsUseCase } from './application/commands/update-inbound_order_items.usecase';
  import { FindOneInbound_order_itemsUseCase } from './application/queries/findOne-inbound_order_items.usecase';
  import { FindInbound_order_itemsUseCase } from './application/queries/findAll-inbound_order_items.usecase';
  import { HardDeleteInbound_order_itemsUseCase } from './application/commands/hard-inbound_order_items.usecase';
  import { SoftDeleteInbound_order_itemsUseCase } from './application/commands/soft-inbound_order_items.usecase';
  import { RestoreInbound_order_itemsUseCase } from './application/commands/restore-inbound_order_items.usecase';
  
  @Module({
    imports: [TypeOrmModule.forFeature([Inbound_order_itemsOrm])],
    controllers: [Inbound_order_itemsController],
    providers: [
      {
        provide: INBOUND_ORDER_ITEMS_REPOSITORY,
        useClass: Inbound_order_itemsRepositoryImpl,
      },
      CreateInbound_order_itemsUseCase,
      UpdateInbound_order_itemsUseCase,
      FindOneInbound_order_itemsUseCase,
      FindInbound_order_itemsUseCase,
      HardDeleteInbound_order_itemsUseCase,
      SoftDeleteInbound_order_itemsUseCase,
      RestoreInbound_order_itemsUseCase,
    ],
  })
  export class Inbound_order_itemsModule {}
  
  
  