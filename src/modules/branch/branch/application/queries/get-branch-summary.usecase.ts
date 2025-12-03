import { Injectable, Inject } from '@nestjs/common';
import {
  BRANCH_REPOSITORY,
  type IBranchRepository,
} from '../../domain/branch.repository';
import { BranchSummaryResponse } from '../../interface/branch.interface';

@Injectable()
export class GetBranchSummaryUseCase {
  constructor(
    @Inject(BRANCH_REPOSITORY)
    private readonly branchRepo: IBranchRepository,
  ) {}

  async execute(): Promise<BranchSummaryResponse> {
    return this.branchRepo.getSummary();
  }
}