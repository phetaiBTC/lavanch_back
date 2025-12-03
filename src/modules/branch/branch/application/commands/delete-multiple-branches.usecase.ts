import { Injectable, Inject } from '@nestjs/common';
import {
  BRANCH_REPOSITORY,
  type IBranchRepository,
} from '../../domain/branch.repository';
import { DeleteMultipleBranchesDto } from '../../dto/delete-multiple-branches.dto';

@Injectable()
export class DeleteMultipleBranchesUseCase {
  constructor(
    @Inject(BRANCH_REPOSITORY)
    private readonly branchRepo: IBranchRepository,
  ) {}

  async execute(dto: DeleteMultipleBranchesDto): Promise<{ message: string; deletedCount: number }> {
    return this.branchRepo.deleteMultiple(dto.ids);
  }
}