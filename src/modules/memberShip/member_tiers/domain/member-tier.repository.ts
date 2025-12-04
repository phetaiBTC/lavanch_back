import { MemberTier } from './member-tier.entity';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';

export const MEMBER_TIER_REPOSITORY = Symbol('MEMBER_TIER_REPOSITORY');

export interface IMemberTierRepository {
  findAll(query: PaginationDto): Promise<PaginatedResponse<MemberTier>>;
  findById(id: number): Promise<MemberTier | null>;
  create(memberTier: MemberTier): Promise<MemberTier>;
  update(memberTier: MemberTier): Promise<MemberTier>;
  hardDelete(id: number): Promise<{ message: string }>;
  softDelete(id: number): Promise<{ message: string }>;
  restore(id: number): Promise<{ message: string }>;
}
