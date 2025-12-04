import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import {
  BRANCH_REPOSITORY,
  type IBranchRepository,
} from '../../domain/branch.repository';
import { Branch } from '../../domain/branch.entity';

@Injectable()
export class FindOneBranchUseCase {
  constructor(
    @Inject(BRANCH_REPOSITORY)
    private readonly branchRepo: IBranchRepository,
  ) {}

  async execute(id: number): Promise<Branch> {
    const branch = await this.branchRepo.findById(id);
    if (!branch) throw new NotFoundException('Branch not found');
    return branch;
  }
}
