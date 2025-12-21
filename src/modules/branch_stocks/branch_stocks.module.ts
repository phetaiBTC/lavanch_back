
  
  import { Module } from '@nestjs/common';
  import { Branch_stocksController } from './branch_stocks.controller';
  import { TypeOrmModule } from '@nestjs/typeorm';
  import { Branch_stocksOrm } from 'src/database/typeorm/branch_stocks.orm-entity';
  import { Branch_stocksRepositoryImpl } from './infrastructure/branch_stocks.repository.impl';
  import { BRANCH_STOCKS_REPOSITORY } from './domain/branch_stocks.repository';
import { CreateBranch_stocksUseCase } from './application/commands/create-branch_stocks.usecase';
import { UpdateBranch_stocksUseCase } from './application/commands/update-branch_stocks.usecase';
import { FindOneBranch_stocksUseCase } from './application/queries/findOne-branch_stocks.usecase';
import { FindBranch_stocksUseCase } from './application/queries/findAll-branch_stocks.usecase';
import { HardDeleteBranch_stocksUseCase } from './application/commands/hard-branch_stocks.usecase';
import { SoftDeleteBranch_stocksUseCase } from './application/commands/soft-branch_stocks.usecase';
import { RestoreBranch_stocksUseCase } from './application/commands/restore-branch_stocks.usecase';
  
  @Module({
    imports: [TypeOrmModule.forFeature([Branch_stocksOrm])],
    controllers: [Branch_stocksController],
    providers: [
      {
        provide: BRANCH_STOCKS_REPOSITORY,
        useClass: Branch_stocksRepositoryImpl,
      },
      CreateBranch_stocksUseCase,
      UpdateBranch_stocksUseCase,
      FindOneBranch_stocksUseCase,
      FindBranch_stocksUseCase,
      HardDeleteBranch_stocksUseCase,
      SoftDeleteBranch_stocksUseCase,
      RestoreBranch_stocksUseCase,
    ],
  })
  export class Branch_stocksModule {}
  
  
  