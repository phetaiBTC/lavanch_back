import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletTransactionRepositoryImpl } from './infrastructure/wallet-transaction.repository.impl';
import { WalletTransactionController } from './wallet-transaction.controller';
import { WALLET_TRANSACTION_REPOSITORY } from './domain/wallet-transaction.repository';
import { WalletTransactionsOrm } from 'src/database/typeorm/wallet_transactions.orm-entity';
import { CreateWalletTransactionUseCase } from './application/commands/create-wallet-transaction.usecase';
import { FindOneWalletTransactionUseCase } from './application/queries/findOne-wallet-transaction.usecase';
import { FindAllWalletTransactionUseCase } from './application/queries/find-wallet-transaction.usecase';
import { FindTransactionsByBranchUseCase } from './application/queries/find-transactions-by-branch.usecase';
import { BranchModule } from '../branch/branch.module';
import { TransactionModule } from 'src/database/transaction/transaction.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([WalletTransactionsOrm]),
    BranchModule,
    TransactionModule,
  ],
  controllers: [WalletTransactionController],
  providers: [
    {
      provide: WALLET_TRANSACTION_REPOSITORY,
      useClass: WalletTransactionRepositoryImpl,
    },
    CreateWalletTransactionUseCase,
    FindOneWalletTransactionUseCase,
    FindAllWalletTransactionUseCase,
    FindTransactionsByBranchUseCase,
  ],
  exports: [WALLET_TRANSACTION_REPOSITORY, CreateWalletTransactionUseCase],
})
export class WalletTransactionModule {}
