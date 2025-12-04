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

  async execute(
    dto: DeleteMultipleBranchesDto,
  ): Promise<{ message: string; deletedIds: number[] }> {
    await this.branchRepo.deleteMultiple(dto.ids);

    return {
      message: `Successfully deleted ${dto.ids.length} branches`,
      deletedIds: dto.ids,
    };
  }
}
