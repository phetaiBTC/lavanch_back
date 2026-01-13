import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BranchExpenseRepositoryImpl } from './infrastructure/branch-expense.repository.impl';
import { BranchExpenseController } from './branch-expense.controller';
import { BRANCH_EXPENSE_REPOSITORY } from './domain/branch-expense.repository';
import { BranchExpensesOrm } from 'src/database/typeorm/branch_expenses.orm-entity';
import { CreateBranchExpenseUseCase } from './application/commands/create-branch-expense.usecase';
import { ApproveExpenseUseCase } from './application/commands/approve-expense.usecase';
import { FindOneBranchExpenseUseCase } from './application/queries/findOne-branch-expense.usecase';
import { FindAllBranchExpenseUseCase } from './application/queries/find-branch-expense.usecase';
import { GetBranchExpenseSummaryUseCase } from './application/queries/get-summary.usecase';
import { GetReceiptImagesUseCase } from './application/queries/get-receipt-images.usecase';
import { WalletTransactionModule } from '../wallet_transactions/wallet-transaction.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BranchExpensesOrm]),
    WalletTransactionModule,
  ],
  controllers: [BranchExpenseController],
  providers: [
    {
      provide: BRANCH_EXPENSE_REPOSITORY,
      useClass: BranchExpenseRepositoryImpl,
    },
    CreateBranchExpenseUseCase,
    ApproveExpenseUseCase,
    FindOneBranchExpenseUseCase,
    FindAllBranchExpenseUseCase,
    GetBranchExpenseSummaryUseCase,
    GetReceiptImagesUseCase,
  ],
  exports: [],
})
export class BranchExpenseModule {}
