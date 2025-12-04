import { Injectable, Inject } from '@nestjs/common';
import {
  BRANCH_REPOSITORY,
  type IBranchRepository,
} from '../../domain/branch.repository';

@Injectable()
export class RestoreBranchUseCase {
  constructor(
    @Inject(BRANCH_REPOSITORY)
    private readonly branchRepo: IBranchRepository,
  ) {}

  async execute(id: number): Promise<{ message: string }> {
    return this.branchRepo.restore(id);
  }
}
