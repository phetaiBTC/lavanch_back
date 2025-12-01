import { MemberPoint } from './member-point.entity';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';

export const MEMBER_POINT_REPOSITORY = Symbol('MEMBER_POINT_REPOSITORY');

export interface IMemberPointRepository {
  findAll(query: PaginationDto): Promise<PaginatedResponse<MemberPoint>>;
  findById(id: number): Promise<MemberPoint | null>;
  findByMemberAndBranch(
    memberId: number,
    branchId: number,
  ): Promise<MemberPoint | null>;
  create(memberPoint: MemberPoint): Promise<MemberPoint>;
  addPoints(
    memberId: number,
    branchId: number,
    points: number,
  ): Promise<MemberPoint>;
  subtractPoints(
    memberId: number,
    branchId: number,
    points: number,
  ): Promise<MemberPoint>;
  getBalance(memberId: number, branchId: number): Promise<number>;
}
