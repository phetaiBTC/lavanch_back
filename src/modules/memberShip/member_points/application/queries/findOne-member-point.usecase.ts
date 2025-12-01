import { Injectable, Inject } from '@nestjs/common';
import { MEMBER_POINT_REPOSITORY, type IMemberPointRepository } from '../../domain/member-point.repository';
import { MemberPoint } from '../../domain/member-point.entity';

@Injectable()
export class FindOneMemberPointUseCase {
  constructor(
    @Inject(MEMBER_POINT_REPOSITORY)
    private readonly pointRepo: IMemberPointRepository,
  ) {}

  async execute(id: number): Promise<MemberPoint | null> {
    return await this.pointRepo.findById(id);
  }
}
