
  
  import { Module } from '@nestjs/common';
  import { Stock_adjustmentsController } from './stock_adjustments.controller';
  import { TypeOrmModule } from '@nestjs/typeorm';
  import { Stock_adjustmentsOrm } from 'src/database/typeorm/stock_adjustments.orm-entity';
  import { Stock_adjustmentsRepositoryImpl } from './infrastructure/stock_adjustments.repository.impl';
  import { STOCK_ADJUSTMENTS_REPOSITORY } from './domain/stock_adjustments.repository';
  import { CreateStock_adjustmentsUseCase } from './application/commands/create-stock_adjustments.usecase';
  import { UpdateStock_adjustmentsUseCase } from './application/commands/update-stock_adjustments.usecase';
  import { FindOneStock_adjustmentsUseCase } from './application/queries/getOne-stock_adjustments.usecase';
  import { FindStock_adjustmentsUseCase } from './application/queries/get-stock_adjustments.usecase';
  import { HardDeleteStock_adjustmentsUseCase } from './application/commands/hard-stock_adjustments.usecase';
  import { SoftDeleteStock_adjustmentsUseCase } from './application/commands/soft-stock_adjustments.usecase';
  import { RestoreStock_adjustmentsUseCase } from './application/commands/restore-stock_adjustments.usecase';
  
  @Module({
    imports: [TypeOrmModule.forFeature([Stock_adjustmentsOrm])],
    controllers: [Stock_adjustmentsController],
    providers: [
      {
        provide: STOCK_ADJUSTMENTS_REPOSITORY,
        useClass: Stock_adjustmentsRepositoryImpl,
      },
      CreateStock_adjustmentsUseCase,
      UpdateStock_adjustmentsUseCase,
      FindOneStock_adjustmentsUseCase,
      FindStock_adjustmentsUseCase,
      HardDeleteStock_adjustmentsUseCase,
      SoftDeleteStock_adjustmentsUseCase,
      RestoreStock_adjustmentsUseCase,
    ],
  })
  export class Stock_adjustmentsModule {}
  
  
  