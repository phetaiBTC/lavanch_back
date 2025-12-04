import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  EXPENSE_CATEGORY_REPOSITORY,
  type IExpenseCategoryRepository,
} from '../../domain/expense-category.repository';
import { ExpenseCategory } from '../../domain/expense-category.entity';
import { CreateExpenseCategoryDto } from '../../dto/create-expense-category.dto';

@Injectable()
export class CreateExpenseCategoryUseCase {
  constructor(
    @Inject(EXPENSE_CATEGORY_REPOSITORY)
    private readonly categoryRepo: IExpenseCategoryRepository,
  ) {}

  async execute(dto: CreateExpenseCategoryDto): Promise<ExpenseCategory> {
    if (dto.code) {
      await this.ensureUniqueCode(dto.code);
    }
    return this.categoryRepo.create(new ExpenseCategory(dto));
  }

  private async ensureUniqueCode(code: string) {
    if (await this.categoryRepo.findByCode(code))
      throw new BadRequestException('Expense category code already exists');
  }
}
