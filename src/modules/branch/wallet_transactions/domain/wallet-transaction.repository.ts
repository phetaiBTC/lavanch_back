import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { WalletTransaction } from './wallet-transaction.entity';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { IRemoveRepository } from 'src/shared/interface/removeRepository.interface';

export const WALLET_TRANSACTION_REPOSITORY = Symbol(
  'WALLET_TRANSACTION_REPOSITORY',
);

export interface IWalletTransactionRepository extends IRemoveRepository {
  findAll(query: PaginationDto): Promise<PaginatedResponse<WalletTransaction>>;
  findById(id: number): Promise<WalletTransaction | null>;
  create(transaction: WalletTransaction): Promise<WalletTransaction>;
  update(transaction: WalletTransaction): Promise<WalletTransaction>;
  findByBranch(
    branchId: number,
    query: PaginationDto,
  ): Promise<PaginatedResponse<WalletTransaction>>;
}
