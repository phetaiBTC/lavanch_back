import { Injectable, Inject } from '@nestjs/common';
import {
  EXPENSE_CATEGORY_REPOSITORY,
  type IExpenseCategoryRepository,
} from '../../domain/expense-category.repository';
import { DeleteMultipleExpenseCategoriesDto } from '../../dto/delete-multiple-expense-categories.dto';

@Injectable()
export class DeleteMultipleExpenseCategoriesUseCase {
  constructor(
    @Inject(EXPENSE_CATEGORY_REPOSITORY)
    private readonly expenseCategoryRepo: IExpenseCategoryRepository,
  ) {}

  async execute(
    dto: DeleteMultipleExpenseCategoriesDto,
  ): Promise<{ message: string; deletedIds: number[] }> {
    await this.expenseCategoryRepo.deleteMultiple(dto.ids);

    return {
      message: `Successfully deleted ${dto.ids.length} expense categories`,
      deletedIds: dto.ids,
    };
  }
}
