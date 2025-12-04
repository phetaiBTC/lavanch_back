import { Injectable, Inject } from '@nestjs/common';
import {
  BRANCH_REPOSITORY,
  type IBranchRepository,
} from '../../domain/branch.repository';

export interface BranchWalletBalance {
  branch_id: number;
  branch_name: string;
  wallet_balance: number;
}

export interface BranchSummaryResponse {
  total_wallet_balance_per_branch: BranchWalletBalance[];
  total_wallet_balance_all_branches: number;
  active_count: number;
  inactive_count: number;
}

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
