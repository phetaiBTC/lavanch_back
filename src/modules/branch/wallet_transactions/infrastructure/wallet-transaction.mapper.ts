import { WalletTransaction } from '../domain/wallet-transaction.entity';
import {
  WalletTransactionsOrm,
  TransactionType,
  TransactionStatus,
} from 'src/database/typeorm/wallet_transactions.orm-entity';
import { WalletTransactionResponse } from '../interface/wallet-transaction.interface';
import { formatDate } from 'src/shared/utils/dayjs.util';
import {
  IPagination,
  PaginatedResponse,
} from 'src/shared/interface/pagination.interface';

export const WalletTransactionMapper = {
  toDomain(schema: WalletTransactionsOrm): WalletTransaction {
    return new WalletTransaction({
      id: schema.id,
      branch_id: schema.branch_id,
      transaction_type: schema.transaction_type,
      amount: Number(schema.amount),
      balance_before: Number(schema.balance_before),
      balance_after: Number(schema.balance_after),
      reference_type: schema.reference_type,
      reference_id: schema.reference_id,
      reference_no: schema.reference_no,
      related_branch_id: schema.related_branch_id,
      related_transaction_id: schema.related_transaction_id,
      description: schema.description,
      notes: schema.notes,
      created_by: schema.created_by,
      approved_by: schema.approved_by,
      status: schema.status,
      transaction_date: schema.transaction_date,
      createdAt: schema.createdAt,
      updatedAt: schema.updatedAt,
      deletedAt: schema.deletedAt,
    });
  },

  toSchema(domain: WalletTransaction): WalletTransactionsOrm {
    const schema = new WalletTransactionsOrm();
    if (domain.value.id != null) schema.id = domain.value.id;
    schema.branch_id = domain.value.branch_id;
    schema.transaction_type = domain.value
      .transaction_type as TransactionType;
    schema.amount = domain.value.amount;
    schema.balance_before = domain.value.balance_before;
    schema.balance_after = domain.value.balance_after;
    if (domain.value.reference_type)
      schema.reference_type = domain.value.reference_type;
    if (domain.value.reference_id)
      schema.reference_id = domain.value.reference_id;
    if (domain.value.reference_no)
      schema.reference_no = domain.value.reference_no;
    if (domain.value.related_branch_id)
      schema.related_branch_id = domain.value.related_branch_id;
    if (domain.value.related_transaction_id)
      schema.related_transaction_id = domain.value.related_transaction_id;
    if (domain.value.description) schema.description = domain.value.description;
    if (domain.value.notes) schema.notes = domain.value.notes;
    schema.created_by = domain.value.created_by;
    if (domain.value.approved_by) schema.approved_by = domain.value.approved_by;
    schema.status = domain.value.status as TransactionStatus;
    schema.transaction_date = domain.value.transaction_date;
    return schema;
  },

  toResponse(domain: WalletTransaction): WalletTransactionResponse {
    return {
      id: domain.value.id!,
      branch_id: domain.value.branch_id,
      transaction_type: domain.value.transaction_type,
      amount: domain.value.amount,
      balance_before: domain.value.balance_before,
      balance_after: domain.value.balance_after,
      reference_type: domain.value.reference_type ?? null,
      reference_id: domain.value.reference_id ?? null,
      reference_no: domain.value.reference_no ?? null,
      related_branch_id: domain.value.related_branch_id ?? null,
      related_transaction_id: domain.value.related_transaction_id ?? null,
      description: domain.value.description ?? null,
      notes: domain.value.notes ?? null,
      created_by: domain.value.created_by,
      approved_by: domain.value.approved_by ?? null,
      status: domain.value.status,
      transaction_date: formatDate(domain.value.transaction_date),
      createdAt: formatDate(domain.value.createdAt),
      updatedAt: formatDate(domain.value.updatedAt),
      deletedAt: domain.value.deletedAt
        ? formatDate(domain.value.deletedAt)
        : null,
    };
  },

  toResponseList(domain: {
    data: WalletTransaction[];
    pagination: IPagination;
  }): PaginatedResponse<WalletTransactionResponse> {
    return {
      data: domain.data.map((domain) => this.toResponse(domain)),
      pagination: domain.pagination,
    };
  },
};
