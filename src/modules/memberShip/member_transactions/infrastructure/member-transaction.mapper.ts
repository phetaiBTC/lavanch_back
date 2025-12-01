import { MemberTransaction } from '../domain/member-transaction.entity';
import { MemberTransactionsOrm } from 'src/database/typeorm/member_transactions.orm-entity';
import { MemberTransactionResponse } from '../interface/member-transaction.interface';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';

export class MemberTransactionMapper {
  static toDomain(orm: MemberTransactionsOrm): MemberTransaction {
    return new MemberTransaction({
      id: orm.id,
      member_id: orm.member_id,
      branch_id: orm.branch_id,
      sale_id: orm.sale_id,
      type: orm.type,
      total_amount: Number(orm.total_amount),
      points_earned: Number(orm.points_earned),
      points_redeemed: Number(orm.points_redeemed),
      points_balance: Number(orm.points_balance),
      date: orm.date,
      notes: orm.notes,
      createdAt: orm.createdAt,
      updatedAt: orm.updatedAt,
      deletedAt: orm.deletedAt,
    });
  }

  static toSchema(domain: MemberTransaction): Partial<MemberTransactionsOrm> {
    const props = domain.value;
    return {
      id: props.id,
      member_id: props.member_id,
      branch_id: props.branch_id,
      sale_id: props.sale_id,
      type: props.type,
      total_amount: props.total_amount,
      points_earned: props.points_earned,
      points_redeemed: props.points_redeemed,
      points_balance: props.points_balance,
      date: props.date,
      notes: props.notes,
    };
  }

  static toResponse(domain: MemberTransaction): MemberTransactionResponse {
    const props = domain.value;
    return {
      id: props.id!,
      member_id: props.member_id,
      branch_id: props.branch_id,
      sale_id: props.sale_id,
      type: props.type,
      total_amount: props.total_amount,
      points_earned: props.points_earned,
      points_redeemed: props.points_redeemed,
      points_balance: props.points_balance,
      date: props.date?.toISOString() || '',
      notes: props.notes,
      createdAt: props.createdAt?.toISOString() || '',
      updatedAt: props.updatedAt?.toISOString() || '',
      deletedAt: props.deletedAt?.toISOString() ?? null,
    };
  }

  static toResponseList(
    paginated: PaginatedResponse<MemberTransaction>,
  ): PaginatedResponse<MemberTransactionResponse> {
    return {
      ...paginated,
      data: paginated.data.map((item) =>
        MemberTransactionMapper.toResponse(item),
      ),
    };
  }
}
