import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import {
  BRANCH_REPOSITORY,
  type IBranchRepository,
} from '../../domain/branch.repository';
import { Branch } from '../../domain/branch.entity';
import { UpdateBranchDto } from '../../dto/update-branch.dto';

@Injectable()
export class UpdateBranchUseCase {
  constructor(
    @Inject(BRANCH_REPOSITORY)
    private readonly branchRepo: IBranchRepository,
  ) {}

  async execute(id: number, dto: UpdateBranchDto): Promise<Branch> {
    const branch = await this.branchRepo.findById(id);
    if (!branch) throw new NotFoundException('Branch not found');

    const updated = branch.update(dto);
    return this.branchRepo.update(updated);
  }
}
