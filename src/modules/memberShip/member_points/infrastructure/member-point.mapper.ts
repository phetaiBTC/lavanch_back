import { MemberPoint } from '../domain/member-point.entity';
import { MemberPointsOrm } from 'src/database/typeorm/member_points.orm-entity';
import { MemberPointResponse } from '../interface/member-point.interface';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';

export class MemberPointMapper {
  static toDomain(orm: MemberPointsOrm): MemberPoint {
    return new MemberPoint({
      id: orm.id,
      member_id: orm.member_id,
      branch_id: orm.branch_id,
      points: Number(orm.points),
      createdAt: orm.createdAt,
      updatedAt: orm.updatedAt,
      deletedAt: orm.deletedAt,
    });
  }

  static toSchema(domain: MemberPoint): Partial<MemberPointsOrm> {
    const props = domain.value;
    return {
      id: props.id,
      member_id: props.member_id,
      branch_id: props.branch_id,
      points: props.points,
    };
  }

  static toResponse(domain: MemberPoint): MemberPointResponse {
    const props = domain.value;
    return {
      id: props.id!,
      member_id: props.member_id,
      branch_id: props.branch_id,
      points: props.points,
      createdAt: props.createdAt?.toISOString() || '',
      updatedAt: props.updatedAt?.toISOString() || '',
      deletedAt: props.deletedAt?.toISOString() ?? null,
    };
  }

  static toResponseList(
    paginated: PaginatedResponse<MemberPoint>,
  ): PaginatedResponse<MemberPointResponse> {
    return {
      ...paginated,
      data: paginated.data.map((item) => MemberPointMapper.toResponse(item)),
    };
  }
}
