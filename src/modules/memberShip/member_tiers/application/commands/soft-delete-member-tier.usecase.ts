import { Injectable, Inject } from '@nestjs/common';
import { MEMBER_TIER_REPOSITORY, type IMemberTierRepository } from '../../domain/member-tier.repository';

@Injectable()
export class SoftDeleteMemberTierUseCase {
  constructor(
    @Inject(MEMBER_TIER_REPOSITORY)
    private readonly tierRepo: IMemberTierRepository,
  ) {}

  async execute(id: number): Promise<{ message: string }> {
    return await this.tierRepo.softDelete(id);
  }
}
