import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import {
  BRANCH_REPOSITORY,
  type IBranchRepository,
} from '../../domain/branch.repository';

@Injectable()
export class ToggleBranchStatusUseCase {
  constructor(
    @Inject(BRANCH_REPOSITORY)
    private readonly branchRepo: IBranchRepository,
  ) {}

  async execute(id: number): Promise<{ message: string; is_active: boolean }> {
    const branch = await this.branchRepo.findById(id);
    if (!branch) {
      throw new NotFoundException(`Branch with ID ${id} not found`);
    }

    // Toggle the status
    const newStatus = !branch.value.is_active;
    const updatedBranch = branch.update({ is_active: newStatus });
    await this.branchRepo.update(updatedBranch);

    return {
      message: `Branch status toggled to ${newStatus ? 'active' : 'inactive'}`,
      is_active: newStatus,
    };
  }
}
