import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { Branch } from './branch.entity';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { IRemoveRepository } from 'src/shared/interface/removeRepository.interface';
import { BranchSummaryResponse } from '../application/queries/get-branch-summary.usecase';

export const BRANCH_REPOSITORY = Symbol('BRANCH_REPOSITORY');

export interface IBranchRepository extends IRemoveRepository {
  findAll(query: PaginationDto): Promise<PaginatedResponse<Branch>>;
  findById(id: number): Promise<Branch | null>;
  create(branch: Branch): Promise<Branch>;
  update(branch: Branch): Promise<Branch>;
  /**
   * Update branch wallet balance - used by wallet transaction service
   */
  updateWalletBalance(branchId: number, newBalance: number): Promise<Branch>;
  /**
   * Get current wallet balance for a branch
   */
  getWalletBalance(branchId: number): Promise<number>;
  /**
   * Get summary statistics for all branches
   */
  getSummary(): Promise<BranchSummaryResponse>;
  /**
   * Delete multiple branches by IDs (soft delete)
   */
  deleteMultiple(ids: number[]): Promise<void>;
}
