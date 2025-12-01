import { Injectable, Inject } from '@nestjs/common';
import {
  MEMBER_POINT_REPOSITORY,
  type IMemberPointRepository,
} from '../../domain/member-point.repository';
import { MemberPoint } from '../../domain/member-point.entity';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';

@Injectable()
export class FindAllMemberPointUseCase {
  constructor(
    @Inject(MEMBER_POINT_REPOSITORY)
    private readonly pointRepo: IMemberPointRepository,
  ) {}

  async execute(query: PaginationDto): Promise<PaginatedResponse<MemberPoint>> {
    return await this.pointRepo.findAll(query);
  }
}
