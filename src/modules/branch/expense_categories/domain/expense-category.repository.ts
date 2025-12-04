import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { ExpenseCategory } from './expense-category.entity';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { IRemoveRepository } from 'src/shared/interface/removeRepository.interface';

export const EXPENSE_CATEGORY_REPOSITORY = Symbol(
  'EXPENSE_CATEGORY_REPOSITORY',
);

export interface IExpenseCategoryRepository extends IRemoveRepository {
  findAll(query: PaginationDto): Promise<PaginatedResponse<ExpenseCategory>>;
  findById(id: number): Promise<ExpenseCategory | null>;
  create(category: ExpenseCategory): Promise<ExpenseCategory>;
  update(category: ExpenseCategory): Promise<ExpenseCategory>;
  findByCode(code: string): Promise<ExpenseCategory | null>;
  deleteMultiple(ids: number[]): Promise<void>;
}
