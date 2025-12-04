import { Injectable, Inject } from '@nestjs/common';
import {
  WALLET_TRANSACTION_REPOSITORY,
  type IWalletTransactionRepository,
} from '../../domain/wallet-transaction.repository';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { WalletTransaction } from '../../domain/wallet-transaction.entity';

@Injectable()
export class FindAllWalletTransactionUseCase {
  constructor(
    @Inject(WALLET_TRANSACTION_REPOSITORY)
    private readonly transactionRepo: IWalletTransactionRepository,
  ) {}

  async execute(
    query: PaginationDto,
  ): Promise<PaginatedResponse<WalletTransaction>> {
    return this.transactionRepo.findAll(query);
  }
}
