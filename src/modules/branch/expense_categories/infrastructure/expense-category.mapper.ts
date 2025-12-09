import { ExpenseCategory } from '../domain/expense-category.entity';
import { ExpenseCategoriesOrm } from 'src/database/typeorm/expense_categories.orm-entity';
import { ExpenseCategoryResponse } from '../interface/expense-category.interface';
import { formatDate } from 'src/shared/utils/dayjs.util';
import {
  IPagination,
  PaginatedResponse,
} from 'src/shared/interface/pagination.interface';

export const ExpenseCategoryMapper = {
  toDomain(schema: ExpenseCategoriesOrm): ExpenseCategory {
    return new ExpenseCategory({
      id: schema.id,
      name: schema.name,
      code: schema.code,
      description: schema.description,
      is_active: schema.is_active,
      createdAt: schema.createdAt,
      updatedAt: schema.updatedAt,
      deletedAt: schema.deletedAt,
    });
  },

  toSchema(domain: ExpenseCategory): ExpenseCategoriesOrm {
    const schema = new ExpenseCategoriesOrm();
    if (domain.value.id != null) schema.id = domain.value.id;
    schema.name = domain.value.name;
    if (domain.value.code) schema.code = domain.value.code;
    if (domain.value.description) schema.description = domain.value.description;
    schema.is_active = domain.value.is_active;
    return schema;
  },

  toResponse(domain: ExpenseCategory): ExpenseCategoryResponse {
    return {
      id: domain.value.id!,
      name: domain.value.name,
      code: domain.value.code ?? null,
      description: domain.value.description ?? null,
      is_active: domain.value.is_active,
      createdAt: formatDate(domain.value.createdAt),
      updatedAt: formatDate(domain.value.updatedAt),
      deletedAt: domain.value.deletedAt
        ? formatDate(domain.value.deletedAt)
        : null,
    };
  },

  toResponseList(domain: {
    data: ExpenseCategory[];
    pagination: IPagination;
  }): PaginatedResponse<ExpenseCategoryResponse> {
    return {
      data: domain.data.map((domain) =>
        ExpenseCategoryMapper.toResponse(domain),
      ),
      pagination: domain.pagination,
    };
  },
};
