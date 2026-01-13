import { Injectable, Inject } from '@nestjs/common';
import {
  EXPENSE_CATEGORY_REPOSITORY,
  type IExpenseCategoryRepository,
} from '../../domain/expense-category.repository';
import { FindExpenseCategoryDto } from '../../dto/find-expense-category.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { ExpenseCategory } from '../../domain/expense-category.entity';

@Injectable()
export class FindAllExpenseCategoryUseCase {
  constructor(
    @Inject(EXPENSE_CATEGORY_REPOSITORY)
    private readonly categoryRepo: IExpenseCategoryRepository,
  ) {}

  async execute(
    query: FindExpenseCategoryDto,
  ): Promise<PaginatedResponse<ExpenseCategory>> {
    return this.categoryRepo.findAll(query);
  }
}
