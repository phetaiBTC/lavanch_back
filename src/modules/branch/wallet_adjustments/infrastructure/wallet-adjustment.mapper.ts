import { WalletAdjustment } from '../domain/wallet-adjustment.entity';
import { WalletAdjustmentsOrm } from 'src/database/typeorm/wallet_adjustments.orm-entity';
import { WalletAdjustmentResponse } from '../interface/wallet-adjustment.interface';
import { formatDate } from 'src/shared/utils/dayjs.util';
import {
  IPagination,
  PaginatedResponse,
} from 'src/shared/interface/pagination.interface';

export const WalletAdjustmentMapper = {
  toDomain(schema: WalletAdjustmentsOrm): WalletAdjustment {
    return new WalletAdjustment({
      id: schema.id,
      adjustment_no: schema.adjustment_no,
      branch_id: schema.branch_id,
      adjustment_type: schema.adjustment_type,
      amount: Number(schema.amount),
      reason: schema.reason,
      description: schema.description,
      created_by: schema.created_by,
      approved_by: schema.approved_by,
      status: schema.status,
      wallet_transaction_id: schema.wallet_transaction_id,
      adjustment_date: schema.adjustment_date,
      createdAt: schema.createdAt,
      updatedAt: schema.updatedAt,
      deletedAt: schema.deletedAt,
    });
  },

  toSchema(domain: WalletAdjustment): WalletAdjustmentsOrm {
    const schema = new WalletAdjustmentsOrm();
    if (domain.value.id != null) schema.id = domain.value.id;
    schema.adjustment_no = domain.value.adjustment_no;
    schema.branch_id = domain.value.branch_id;
    schema.adjustment_type = domain.value.adjustment_type as any;
    schema.amount = domain.value.amount;
    schema.reason = domain.value.reason as any;
    if (domain.value.description) schema.description = domain.value.description;
    schema.created_by = domain.value.created_by;
    if (domain.value.approved_by) schema.approved_by = domain.value.approved_by;
    schema.status = domain.value.status as any;
    if (domain.value.wallet_transaction_id) schema.wallet_transaction_id = domain.value.wallet_transaction_id;
    schema.adjustment_date = domain.value.adjustment_date;
    return schema;
  },

  toResponse(domain: WalletAdjustment): WalletAdjustmentResponse {
    return {
      id: domain.value.id!,
      adjustment_no: domain.value.adjustment_no,
      branch_id: domain.value.branch_id,
      adjustment_type: domain.value.adjustment_type,
      amount: domain.value.amount,
      reason: domain.value.reason,
      description: domain.value.description ?? null,
      created_by: domain.value.created_by,
      approved_by: domain.value.approved_by ?? null,
      status: domain.value.status,
      wallet_transaction_id: domain.value.wallet_transaction_id ?? null,
      adjustment_date: formatDate(domain.value.adjustment_date),
      createdAt: formatDate(domain.value.createdAt),
      updatedAt: formatDate(domain.value.updatedAt),
      deletedAt: domain.value.deletedAt ? formatDate(domain.value.deletedAt) : null,
    };
  },

  toResponseList(domain: {
    data: WalletAdjustment[];
    pagination: IPagination;
  }): PaginatedResponse<WalletAdjustmentResponse> {
    return {
      data: domain.data.map((domain) => this.toResponse(domain)),
      pagination: domain.pagination,
    };
  },
};
