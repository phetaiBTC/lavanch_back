import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletAdjustmentRepositoryImpl } from './infrastructure/wallet-adjustment.repository.impl';
import { WalletAdjustmentController } from './wallet-adjustment.controller';
import { WALLET_ADJUSTMENT_REPOSITORY } from './domain/wallet-adjustment.repository';
import { WalletAdjustmentsOrm } from 'src/database/typeorm/wallet_adjustments.orm-entity';
import { CreateWalletAdjustmentDispositUseCase } from './application/commands/create-wallet-adjustment-disposit.usecase';
import { CreateWalletAdjustmentFoundUseCase } from './application/commands/create-wallet-adjustment-found.usecase';
import { CreateWalletAdjustmentLostUseCase } from './application/commands/create-wallet-adjustment-lost.usecase';
import { ApproveAdjustmentUseCase } from './application/commands/approve-adjustment.usecase';
import { FindOneWalletAdjustmentUseCase } from './application/queries/findOne-wallet-adjustment.usecase';
import { FindAllWalletAdjustmentUseCase } from './application/queries/find-wallet-adjustment.usecase';
import { WalletTransactionModule } from '../wallet_transactions/wallet-transaction.module';
import { BranchModule } from '../branch/branch.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([WalletAdjustmentsOrm]),
    WalletTransactionModule,
    BranchModule,
  ],
  controllers: [WalletAdjustmentController],
  providers: [
    {
      provide: WALLET_ADJUSTMENT_REPOSITORY,
      useClass: WalletAdjustmentRepositoryImpl,
    }
    CreateWalletAdjustmentDispositUseCase,
    CreateWalletAdjustmentFoundUseCase,
    CreateWalletAdjustmentLostUseCase,
    ApproveAdjustmentUseCase,
    FindOneWalletAdjustmentUseCase,
    FindAllWalletAdjustmentUseCase,
  ],
  exports: [],
})
export class WalletAdjustmentModule {}
