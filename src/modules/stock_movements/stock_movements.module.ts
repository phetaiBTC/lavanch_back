
  
  import { Module } from '@nestjs/common';
  import { Stock_movementsController } from './stock_movements.controller';
  import { TypeOrmModule } from '@nestjs/typeorm';
  import { Stock_movementsOrm } from 'src/database/typeorm/stock_movements.orm-entity';
  import { Stock_movementsRepositoryImpl } from './infrastructure/stock_movements.repository.impl';
  import { STOCK_MOVEMENTS_REPOSITORY } from './domain/stock_movements.repository';
  import { CreateStock_movementsUseCase } from './application/commands/create-stock_movements.usecase';
  import { UpdateStock_movementsUseCase } from './application/commands/update-stock_movements.usecase';
  import { FindOneStock_movementsUseCase } from './application/queries/findOne-stock_movements.usecase';
  import { FindStock_movementsUseCase } from './application/queries/findAll-stock_movements.usecase';
  import { HardDeleteStock_movementsUseCase } from './application/commands/hard-stock_movements.usecase';
  import { SoftDeleteStock_movementsUseCase } from './application/commands/soft-stock_movements.usecase';
  import { RestoreStock_movementsUseCase } from './application/commands/restore-stock_movements.usecase';
  
  @Module({
    imports: [TypeOrmModule.forFeature([Stock_movementsOrm])],
    controllers: [Stock_movementsController],
    providers: [
      {
        provide: STOCK_MOVEMENTS_REPOSITORY,
        useClass: Stock_movementsRepositoryImpl,
      },
      CreateStock_movementsUseCase,
      UpdateStock_movementsUseCase,
      FindOneStock_movementsUseCase,
      FindStock_movementsUseCase,
      HardDeleteStock_movementsUseCase,
      SoftDeleteStock_movementsUseCase,
      RestoreStock_movementsUseCase,
    ],
  })
  export class Stock_movementsModule {}
  
  
  