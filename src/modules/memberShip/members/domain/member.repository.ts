import { Member } from './member.entity';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';

export const MEMBER_REPOSITORY = Symbol('MEMBER_REPOSITORY');

export interface IMemberRepository {
  findAll(query: PaginationDto): Promise<PaginatedResponse<Member>>;
  findById(id: number): Promise<Member | null>;
  findByPhone(phone: string): Promise<Member | null>;
  findByMemberNo(memberNo: string): Promise<Member | null>;
  getNextMemberNo(): Promise<string>;
  create(member: Member): Promise<Member>;
  update(member: Member): Promise<Member>;
  hardDelete(id: number): Promise<{ message: string }>;
  softDelete(id: number): Promise<{ message: string }>;
  restore(id: number): Promise<{ message: string }>;
  updateTotalSpending(id: number, amount: number): Promise<void>;
  autoUpgradeTier(id: number): Promise<void>;
}
