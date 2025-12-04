import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import {
  EXPENSE_CATEGORY_REPOSITORY,
  type IExpenseCategoryRepository,
} from '../../domain/expense-category.repository';

@Injectable()
export class ToggleExpenseCategoryStatusUseCase {
  constructor(
    @Inject(EXPENSE_CATEGORY_REPOSITORY)
    private readonly expenseCategoryRepo: IExpenseCategoryRepository,
  ) {}

  async execute(id: number): Promise<{ message: string; is_active: boolean }> {
    const category = await this.expenseCategoryRepo.findById(id);
    if (!category) {
      throw new NotFoundException(`Expense Category with ID ${id} not found`);
    }

    // Toggle the status
    const newStatus = !category.value.is_active;
    const updatedCategory = category.update({ is_active: newStatus });
    await this.expenseCategoryRepo.update(updatedCategory);

    return {
      message: `Expense Category status toggled to ${newStatus ? 'active' : 'inactive'}`,
      is_active: newStatus,
    };
  }
}
