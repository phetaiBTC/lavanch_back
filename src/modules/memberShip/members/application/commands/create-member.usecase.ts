import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { MEMBER_REPOSITORY, type IMemberRepository } from '../../domain/member.repository';
import { Member } from '../../domain/member.entity';
import { CreateMemberDto } from '../../dto/create-member.dto';

@Injectable()
export class CreateMemberUseCase {
  constructor(
    @Inject(MEMBER_REPOSITORY)
    private readonly memberRepo: IMemberRepository,
  ) {}

  async execute(dto: CreateMemberDto): Promise<Member> {
    // Check if phone already exists
    const existing = await this.memberRepo.findByPhone(dto.phone);
    if (existing) {
      throw new BadRequestException(`Phone number ${dto.phone} is already registered`);
    }

    // Auto-generate member_no
    const memberNo = await this.memberRepo.getNextMemberNo();

    const member = new Member({
      member_no: memberNo,
      name: dto.name,
      phone: dto.phone,
      email: dto.email,
      birthday: dto.birthday ? new Date(dto.birthday) : undefined,
      gender: dto.gender,
      tier_id: dto.tier_id,
      total_spending: 0,
      registered_branch_id: dto.registered_branch_id,
    });

    return await this.memberRepo.create(member);
  }
}
