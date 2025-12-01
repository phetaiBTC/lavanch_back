import { Injectable, Inject } from '@nestjs/common';
import {
  MEMBER_TIER_REPOSITORY,
  type IMemberTierRepository,
} from '../../domain/member-tier.repository';
import { MemberTier } from '../../domain/member-tier.entity';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';

@Injectable()
export class FindAllMemberTierUseCase {
  constructor(
    @Inject(MEMBER_TIER_REPOSITORY)
    private readonly tierRepo: IMemberTierRepository,
  ) {}

  async execute(query: PaginationDto): Promise<PaginatedResponse<MemberTier>> {
    return await this.tierRepo.findAll(query);
  }
}
