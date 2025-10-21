import { BranchExpense } from '../domain/branch-expense.entity';
import { BranchExpensesOrm } from 'src/database/typeorm/branch_expenses.orm-entity';
import { BranchExpenseResponse } from '../interface/branch-expense.interface';
import { formatDate } from 'src/shared/utils/dayjs.util';
import {
  IPagination,
  PaginatedResponse,
} from 'src/shared/interface/pagination.interface';

export const BranchExpenseMapper = {
  toDomain(schema: BranchExpensesOrm): BranchExpense {
    return new BranchExpense({
      id: schema.id,
      expense_no: schema.expense_no,
      branch_id: schema.branch_id,
      expense_category_id: schema.expense_category_id,
      amount: Number(schema.amount),
      currency_id: schema.currency_id,
      expense_date: schema.expense_date,
      description: schema.description,
      notes: schema.notes,
      receipt_image: schema.receipt_image,
      created_by: schema.created_by,
      approved_by: schema.approved_by,
      status: schema.status,
      wallet_transaction_id: schema.wallet_transaction_id,
      createdAt: schema.createdAt,
      updatedAt: schema.updatedAt,
      deletedAt: schema.deletedAt,
    });
  },

  toSchema(domain: BranchExpense): BranchExpensesOrm {
    const schema = new BranchExpensesOrm();
    if (domain.value.id != null) schema.id = domain.value.id;
    schema.expense_no = domain.value.expense_no;
    schema.branch_id = domain.value.branch_id;
    schema.expense_category_id = domain.value.expense_category_id;
    schema.amount = domain.value.amount;
    schema.currency_id = domain.value.currency_id;
    schema.expense_date = domain.value.expense_date;
    if (domain.value.description) schema.description = domain.value.description;
    if (domain.value.notes) schema.notes = domain.value.notes;
    if (domain.value.receipt_image) schema.receipt_image = domain.value.receipt_image;
    schema.created_by = domain.value.created_by;
    if (domain.value.approved_by) schema.approved_by = domain.value.approved_by;
    schema.status = domain.value.status as any;
    if (domain.value.wallet_transaction_id) schema.wallet_transaction_id = domain.value.wallet_transaction_id;
    return schema;
  },

  toResponse(domain: BranchExpense): BranchExpenseResponse {
    return {
      id: domain.value.id!,
      expense_no: domain.value.expense_no,
      branch_id: domain.value.branch_id,
      expense_category_id: domain.value.expense_category_id,
      amount: domain.value.amount,
      currency_id: domain.value.currency_id,
      expense_date: formatDate(domain.value.expense_date),
      description: domain.value.description ?? null,
      notes: domain.value.notes ?? null,
      receipt_image: domain.value.receipt_image ?? null,
      created_by: domain.value.created_by,
      approved_by: domain.value.approved_by ?? null,
      status: domain.value.status,
      wallet_transaction_id: domain.value.wallet_transaction_id ?? null,
      createdAt: formatDate(domain.value.createdAt),
      updatedAt: formatDate(domain.value.updatedAt),
      deletedAt: domain.value.deletedAt ? formatDate(domain.value.deletedAt) : null,
    };
  },

  toResponseList(domain: {
    data: BranchExpense[];
    pagination: IPagination;
  }): PaginatedResponse<BranchExpenseResponse> {
    return {
      data: domain.data.map((domain) => this.toResponse(domain)),
      pagination: domain.pagination,
    };
  },
};
