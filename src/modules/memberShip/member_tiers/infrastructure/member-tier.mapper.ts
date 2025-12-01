import { MemberTier, MemberTierProps } from '../domain/member-tier.entity';
import { MemberTiersOrm } from 'src/database/typeorm/member_tiers.orm-entity';
import { MemberTierResponse } from '../interface/member-tier.interface';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';

export class MemberTierMapper {
  static toDomain(orm: MemberTiersOrm): MemberTier {
    return new MemberTier({
      id: orm.id,
      name: orm.name,
      min_spending: Number(orm.min_spending),
      discount_percent: Number(orm.discount_percent),
      points_multiplier: Number(orm.points_multiplier),
      is_active: orm.is_active,
      createdAt: orm.createdAt,
      updatedAt: orm.updatedAt,
      deletedAt: orm.deletedAt,
    });
  }

  static toSchema(domain: MemberTier): Partial<MemberTiersOrm> {
    const props = domain.value;
    return {
      id: props.id,
      name: props.name,
      min_spending: props.min_spending,
      discount_percent: props.discount_percent,
      points_multiplier: props.points_multiplier,
      is_active: props.is_active,
    };
  }

  static toResponse(domain: MemberTier): MemberTierResponse {
    const props = domain.value;
    return {
      id: props.id!,
      name: props.name,
      min_spending: props.min_spending,
      discount_percent: props.discount_percent,
      points_multiplier: props.points_multiplier,
      is_active: props.is_active,
      createdAt: props.createdAt?.toISOString() || '',
      updatedAt: props.updatedAt?.toISOString() || '',
      deletedAt: props.deletedAt?.toISOString() ?? null,
    };
  }

  static toResponseList(
    paginated: PaginatedResponse<MemberTier>,
  ): PaginatedResponse<MemberTierResponse> {
    return {
      ...paginated,
      data: paginated.data.map((item) => MemberTierMapper.toResponse(item)),
    };
  }
}
