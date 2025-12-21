
  
  import { Module } from '@nestjs/common';
  import { Inbound_ordersController } from './inbound_orders.controller';
  import { TypeOrmModule } from '@nestjs/typeorm';
  import { Inbound_ordersOrm } from 'src/database/typeorm/inbound_orders.orm-entity';
  import { Inbound_ordersRepositoryImpl } from './infrastructure/inbound_orders.repository.impl';
  import { INBOUND_ORDERS_REPOSITORY } from './domain/inbound_orders.repository';
  import { CreateInbound_ordersUseCase } from './application/commands/create-inbound_orders.usecase';
  import { UpdateInbound_ordersUseCase } from './application/commands/update-inbound_orders.usecase';
  import { FindOneInbound_ordersUseCase } from './application/queries/findOne-inbound_orders.usecase';
  import { FindInbound_ordersUseCase } from './application/queries/findAll-inbound_orders.usecase';
  import { HardDeleteInbound_ordersUseCase } from './application/commands/hard-inbound_orders.usecase';
  import { SoftDeleteInbound_ordersUseCase } from './application/commands/soft-inbound_orders.usecase';
  import { RestoreInbound_ordersUseCase } from './application/commands/restore-inbound_orders.usecase';
  
  @Module({
    imports: [TypeOrmModule.forFeature([Inbound_ordersOrm])],
    controllers: [Inbound_ordersController],
    providers: [
      {
        provide: INBOUND_ORDERS_REPOSITORY,
        useClass: Inbound_ordersRepositoryImpl,
      },
      CreateInbound_ordersUseCase,
      UpdateInbound_ordersUseCase,
      FindOneInbound_ordersUseCase,
      FindInbound_ordersUseCase,
      HardDeleteInbound_ordersUseCase,
      SoftDeleteInbound_ordersUseCase,
      RestoreInbound_ordersUseCase,
    ],
  })
  export class Inbound_ordersModule {}
  
  
  