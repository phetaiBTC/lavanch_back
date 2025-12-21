
  
  import { Module } from '@nestjs/common';
  import { Stock_transfersController } from './stock_transfers.controller';
  import { TypeOrmModule } from '@nestjs/typeorm';
  import { Stock_transfersOrm } from 'src/database/typeorm/stock_transfers.orm-entity';
  import { Stock_transfersRepositoryImpl } from './infrastructure/stock_transfers.repository.impl';
  import { STOCK_TRANSFERS_REPOSITORY } from './domain/stock_transfers.repository';
import { CreateStock_transfersUseCase } from './application/commands/create-stock_transfers.usecase';
import { UpdateStock_transfersUseCase } from './application/commands/update-stock_transfers.usecase';
import { FindOneStock_transfersUseCase } from './application/queries/findOne-stock_transfers.usecase';
import { FindStock_transfersUseCase } from './application/queries/findAll-stock_transfers.usecase';
import { HardDeleteStock_transfersUseCase } from './application/commands/hard-stock_transfers.usecase';
import { SoftDeleteStock_transfersUseCase } from './application/commands/soft-stock_transfers.usecase';
import { RestoreStock_transfersUseCase } from './application/commands/restore-stock_transfers.usecase';
  
  @Module({
    imports: [TypeOrmModule.forFeature([Stock_transfersOrm])],
    controllers: [Stock_transfersController],
    providers: [
      {
        provide: STOCK_TRANSFERS_REPOSITORY,
        useClass: Stock_transfersRepositoryImpl,
      },
      CreateStock_transfersUseCase,
      UpdateStock_transfersUseCase,
      FindOneStock_transfersUseCase,
      FindStock_transfersUseCase,
      HardDeleteStock_transfersUseCase,
      SoftDeleteStock_transfersUseCase,
      RestoreStock_transfersUseCase,
    ],
  })
  export class Stock_transfersModule {}
  
  
  