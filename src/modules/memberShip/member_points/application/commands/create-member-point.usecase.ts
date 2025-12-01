import { Injectable, Inject } from '@nestjs/common';
import { MEMBER_POINT_REPOSITORY, type IMemberPointRepository } from '../../domain/member-point.repository';
import { MemberPoint } from '../../domain/member-point.entity';
import { CreateMemberPointDto } from '../../dto/create-member-point.dto';

@Injectable()
export class CreateMemberPointUseCase {
  constructor(
    @Inject(MEMBER_POINT_REPOSITORY)
    private readonly pointRepo: IMemberPointRepository,
  ) {}

  async execute(dto: CreateMemberPointDto): Promise<MemberPoint> {
    const memberPoint = new MemberPoint({
      member_id: dto.member_id,
      branch_id: dto.branch_id,
      points: dto.points || 0,
    });

    return await this.pointRepo.create(memberPoint);
  }
}
