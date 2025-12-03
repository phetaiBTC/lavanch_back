import { Injectable, Inject } from '@nestjs/common';
import {
  BRANCH_REPOSITORY,
  type IBranchRepository,
} from '../../domain/branch.repository';
import { Branch } from '../../domain/branch.entity';

@Injectable()
export class ToggleBranchStatusUseCase {
  constructor(
    @Inject(BRANCH_REPOSITORY)
    private readonly branchRepo: IBranchRepository,
  ) {}

  async execute(id: number): Promise<Branch> {
    return this.branchRepo.toggleStatus(id);
  }
}