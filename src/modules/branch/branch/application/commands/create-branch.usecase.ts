import { Injectable, Inject } from '@nestjs/common';
import {
  BRANCH_REPOSITORY,
  type IBranchRepository,
} from '../../domain/branch.repository';
import { Branch } from '../../domain/branch.entity';
import { CreateBranchDto } from '../../dto/create-branch.dto';

@Injectable()
export class CreateBranchUseCase {
  constructor(
    @Inject(BRANCH_REPOSITORY)
    private readonly branchRepo: IBranchRepository,
  ) {}

  async execute(dto: CreateBranchDto): Promise<Branch> {
    // Initialize wallet balance to 0 when creating new branch
    return this.branchRepo.create(new Branch({ ...dto, wallet_balance: 0 }));
  }
}
