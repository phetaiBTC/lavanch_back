import { Injectable, Inject } from '@nestjs/common';
import {
  MEMBER_REPOSITORY,
  type IMemberRepository,
} from '../../domain/member.repository';
import { Member } from '../../domain/member.entity';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';

@Injectable()
export class FindAllMemberUseCase {
  constructor(
    @Inject(MEMBER_REPOSITORY)
    private readonly memberRepo: IMemberRepository,
  ) {}

  async execute(query: PaginationDto): Promise<PaginatedResponse<Member>> {
    return await this.memberRepo.findAll(query);
  }
}
