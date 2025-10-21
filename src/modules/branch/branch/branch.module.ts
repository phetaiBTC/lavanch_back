import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BranchRepositoryImpl } from './infrastructure/branch.repository.impl';
import { BranchController } from './branch.controller';
import { BRANCH_REPOSITORY } from './domain/branch.repository';
import { BranchesOrm } from 'src/database/typeorm/branches.orm-entity';
import { CreateBranchUseCase } from './application/commands/create-branch.usecase';
import { HardDeleteBranchUseCase } from './application/commands/hard-branch.usecase';
import { SoftDeleteBranchUseCase } from './application/commands/soft-branch.usecase';
import { RestoreBranchUseCase } from './application/commands/restore-branch.usecase';
import { FindOneBranchUseCase } from './application/queries/findOne-branch.usecase';
import { FindAllBranchUseCase } from './application/queries/find-branch.usecase';
import { UpdateBranchUseCase } from './application/commands/update-branch.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([BranchesOrm])],
  controllers: [BranchController],
  providers: [
    { provide: BRANCH_REPOSITORY, useClass: BranchRepositoryImpl },
    CreateBranchUseCase,
    UpdateBranchUseCase,
    HardDeleteBranchUseCase,
    SoftDeleteBranchUseCase,
    RestoreBranchUseCase,
    FindOneBranchUseCase,
    FindAllBranchUseCase,
  ],
  exports: [BRANCH_REPOSITORY, FindOneBranchUseCase],
})
export class BranchModule {}
