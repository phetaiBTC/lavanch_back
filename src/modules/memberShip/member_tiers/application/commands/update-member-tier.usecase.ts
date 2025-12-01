import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import {
  MEMBER_TIER_REPOSITORY,
  type IMemberTierRepository,
} from '../../domain/member-tier.repository';
import { MemberTier } from '../../domain/member-tier.entity';
import { UpdateMemberTierDto } from '../../dto/update-member-tier.dto';

@Injectable()
export class UpdateMemberTierUseCase {
  constructor(
    @Inject(MEMBER_TIER_REPOSITORY)
    private readonly tierRepo: IMemberTierRepository,
  ) {}

  async execute(id: number, dto: UpdateMemberTierDto): Promise<MemberTier> {
    const existing = await this.tierRepo.findById(id);
    if (!existing) {
      throw new NotFoundException(`Member tier with ID ${id} not found`);
    }

    const updated = new MemberTier({
      ...existing.value,
      ...dto,
    });

    return await this.tierRepo.update(updated);
  }
}
