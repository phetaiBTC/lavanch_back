import { Injectable, Inject } from '@nestjs/common';
import { MEMBER_TIER_REPOSITORY, type IMemberTierRepository } from '../../domain/member-tier.repository';
import { MemberTier } from '../../domain/member-tier.entity';
import { CreateMemberTierDto } from '../../dto/create-member-tier.dto';

@Injectable()
export class CreateMemberTierUseCase {
  constructor(
    @Inject(MEMBER_TIER_REPOSITORY)
    private readonly tierRepo: IMemberTierRepository,
  ) {}

  async execute(dto: CreateMemberTierDto): Promise<MemberTier> {
    const tier = new MemberTier({
      name: dto.name,
      min_spending: dto.min_spending,
      discount_percent: dto.discount_percent,
      points_multiplier: dto.points_multiplier,
      is_active: dto.is_active ?? true,
    });

    return await this.tierRepo.create(tier);
  }
}
