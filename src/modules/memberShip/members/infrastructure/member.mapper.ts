import { Member, MemberProps } from '../domain/member.entity';
import { MembersOrm } from 'src/database/typeorm/members.orm-entity';
import { MemberResponse } from '../interface/member.interface';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';

export class MemberMapper {
  static toDomain(orm: MembersOrm): Member {
    return new Member({
      id: orm.id,
      member_no: orm.member_no,
      name: orm.name,
      phone: orm.phone,
      email: orm.email,
      birthday: orm.birthday,
      gender: orm.gender,
      tier_id: orm.tier_id,
      total_spending: Number(orm.total_spending),
      registered_branch_id: orm.registered_branch_id,
      createdAt: orm.createdAt,
      updatedAt: orm.updatedAt,
      deletedAt: orm.deletedAt,
    });
  }

  static toSchema(domain: Member): Partial<MembersOrm> {
    const props = domain.value;
    return {
      id: props.id,
      member_no: props.member_no,
      name: props.name,
      phone: props.phone,
      email: props.email,
      birthday: props.birthday,
      gender: props.gender,
      tier_id: props.tier_id,
      total_spending: props.total_spending,
      registered_branch_id: props.registered_branch_id,
    };
  }

  static toResponse(domain: Member): MemberResponse {
    const props = domain.value;
    return {
      id: props.id!,
      member_no: props.member_no,
      name: props.name,
      phone: props.phone,
      email: props.email,
      birthday: props.birthday?.toISOString(),
      gender: props.gender,
      tier_id: props.tier_id,
      total_spending: props.total_spending,
      registered_branch_id: props.registered_branch_id,
      createdAt: props.createdAt?.toISOString() || '',
      updatedAt: props.updatedAt?.toISOString() || '',
      deletedAt: props.deletedAt?.toISOString() ?? null,
    };
  }

  static toResponseList(
    paginated: PaginatedResponse<Member>,
  ): PaginatedResponse<MemberResponse> {
    return {
      ...paginated,
      data: paginated.data.map((item) => MemberMapper.toResponse(item)),
    };
  }
}
