import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import {
  MEMBER_REPOSITORY,
  type IMemberRepository,
} from '../../domain/member.repository';
import { Member } from '../../domain/member.entity';
import { UpdateMemberDto } from '../../dto/update-member.dto';

@Injectable()
export class UpdateMemberUseCase {
  constructor(
    @Inject(MEMBER_REPOSITORY)
    private readonly memberRepo: IMemberRepository,
  ) {}

  async execute(id: number, dto: UpdateMemberDto): Promise<Member> {
    const existing = await this.memberRepo.findById(id);
    if (!existing) {
      throw new NotFoundException(`Member with ID ${id} not found`);
    }

    const updated = new Member({
      ...existing.value,
      name: dto.name ?? existing.value.name,
      phone: dto.phone ?? existing.value.phone,
      email: dto.email ?? existing.value.email,
      birthday: dto.birthday ? new Date(dto.birthday) : existing.value.birthday,
      gender: dto.gender ?? existing.value.gender,
      tier_id: dto.tier_id ?? existing.value.tier_id,
      registered_branch_id:
        dto.registered_branch_id ?? existing.value.registered_branch_id,
    });

    return await this.memberRepo.update(updated);
  }
}
