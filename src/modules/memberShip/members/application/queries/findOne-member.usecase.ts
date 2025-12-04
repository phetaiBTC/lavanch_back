import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import {
  MEMBER_REPOSITORY,
  type IMemberRepository,
} from '../../domain/member.repository';
import { Member } from '../../domain/member.entity';

@Injectable()
export class FindOneMemberUseCase {
  constructor(
    @Inject(MEMBER_REPOSITORY)
    private readonly memberRepo: IMemberRepository,
  ) {}

  async execute(id: number): Promise<Member> {
    const member = await this.memberRepo.findById(id);
    if (!member) {
      throw new NotFoundException(`Member with ID ${id} not found`);
    }
    return member;
  }
}
