import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseCategoryRepositoryImpl } from './infrastructure/expense-category.repository.impl';
import { ExpenseCategoryController } from './expense-category.controller';
import { EXPENSE_CATEGORY_REPOSITORY } from './domain/expense-category.repository';
import { ExpenseCategoriesOrm } from 'src/database/typeorm/expense_categories.orm-entity';
import { CreateExpenseCategoryUseCase } from './application/commands/create-expense-category.usecase';
import { HardDeleteExpenseCategoryUseCase } from './application/commands/hard-expense-category.usecase';
import { SoftDeleteExpenseCategoryUseCase } from './application/commands/soft-expense-category.usecase';
import { RestoreExpenseCategoryUseCase } from './application/commands/restore-expense-category.usecase';
import { FindOneExpenseCategoryUseCase } from './application/queries/findOne-expense-category.usecase';
import { FindAllExpenseCategoryUseCase } from './application/queries/find-expense-category.usecase';
import { UpdateExpenseCategoryUseCase } from './application/commands/update-expense-category.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([ExpenseCategoriesOrm])],
  controllers: [ExpenseCategoryController],
  providers: [
    { provide: EXPENSE_CATEGORY_REPOSITORY, useClass: ExpenseCategoryRepositoryImpl },
    CreateExpenseCategoryUseCase,
    UpdateExpenseCategoryUseCase,
    HardDeleteExpenseCategoryUseCase,
    SoftDeleteExpenseCategoryUseCase,
    RestoreExpenseCategoryUseCase,
    FindOneExpenseCategoryUseCase,
    FindAllExpenseCategoryUseCase,
  ],
  exports: [FindOneExpenseCategoryUseCase],
})
export class ExpenseCategoryModule {}
