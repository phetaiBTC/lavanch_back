import { Injectable, Inject } from '@nestjs/common';
import {
  EXPENSE_CATEGORY_REPOSITORY,
  type IExpenseCategoryRepository,
} from '../../domain/expense-category.repository';

@Injectable()
export class HardDeleteExpenseCategoryUseCase {
  constructor(
    @Inject(EXPENSE_CATEGORY_REPOSITORY)
    private readonly categoryRepo: IExpenseCategoryRepository,
  ) {}

  async execute(id: number): Promise<{ message: string }> {
    return this.categoryRepo.hardDelete(id);
  }
}
