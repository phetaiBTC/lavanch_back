import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { MEMBER_TIER_REPOSITORY, type IMemberTierRepository } from '../../domain/member-tier.repository';
import { MemberTier } from '../../domain/member-tier.entity';

@Injectable()
export class FindOneMemberTierUseCase {
  constructor(
    @Inject(MEMBER_TIER_REPOSITORY)
    private readonly tierRepo: IMemberTierRepository,
  ) {}

  async execute(id: number): Promise<MemberTier> {
    const tier = await this.tierRepo.findById(id);
    if (!tier) {
      throw new NotFoundException(`Member tier with ID ${id} not found`);
    }
    return tier;
  }
}
