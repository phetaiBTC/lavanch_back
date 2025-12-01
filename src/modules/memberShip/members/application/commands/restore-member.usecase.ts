import { Injectable, Inject } from '@nestjs/common';
import { MEMBER_REPOSITORY, type IMemberRepository } from '../../domain/member.repository';

@Injectable()
export class RestoreMemberUseCase {
  constructor(
    @Inject(MEMBER_REPOSITORY)
    private readonly memberRepo: IMemberRepository,
  ) {}

  async execute(id: number): Promise<{ message: string }> {
    return await this.memberRepo.restore(id);
  }
}
