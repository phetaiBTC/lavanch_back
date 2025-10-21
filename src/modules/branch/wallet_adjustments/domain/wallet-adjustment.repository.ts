import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { WalletAdjustment } from './wallet-adjustment.entity';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { IRemoveRepository } from 'src/shared/interface/removeRepository.interface';

export const WALLET_ADJUSTMENT_REPOSITORY = Symbol('WALLET_ADJUSTMENT_REPOSITORY');

export interface IWalletAdjustmentRepository extends IRemoveRepository {
  findAll(query: PaginationDto): Promise<PaginatedResponse<WalletAdjustment>>;
  findById(id: number): Promise<WalletAdjustment | null>;
  create(adjustment: WalletAdjustment): Promise<WalletAdjustment>;
  update(adjustment: WalletAdjustment): Promise<WalletAdjustment>;
  findByBranch(branchId: number, query: PaginationDto): Promise<PaginatedResponse<WalletAdjustment>>;
  generateAdjustmentNo(): Promise<string>;
}
