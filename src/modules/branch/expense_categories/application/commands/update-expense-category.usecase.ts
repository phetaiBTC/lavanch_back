import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import {
  EXPENSE_CATEGORY_REPOSITORY,
  type IExpenseCategoryRepository,
} from '../../domain/expense-category.repository';
import { ExpenseCategory } from '../../domain/expense-category.entity';
import { UpdateExpenseCategoryDto } from '../../dto/update-expense-category.dto';

@Injectable()
export class UpdateExpenseCategoryUseCase {
  constructor(
    @Inject(EXPENSE_CATEGORY_REPOSITORY)
    private readonly categoryRepo: IExpenseCategoryRepository,
  ) {}

  async execute(id: number, dto: UpdateExpenseCategoryDto): Promise<ExpenseCategory> {
    const category = await this.categoryRepo.findById(id);
    if (!category) throw new NotFoundException('Expense category not found');

    const updated = category.update(dto);
    return this.categoryRepo.update(updated);
  }
}
