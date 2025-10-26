import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PriceHistoryRepositoryImpl } from './infrastructure/price_history.repository.impl';
import { PriceHistoryController } from './price_history.controller';
import { PRICE_HISTORY_REPOSITORY } from './domain/price_history.repository';
import { PriceHistoryOrm } from 'src/database/typeorm/price_history.orm-entity';
import { CreatePriceHistoryUseCase } from './application/commands/create-PriceHistory.usecase';
import { UpdatePriceHistoryUseCase } from './application/commands/update-PriceHistory.usecase';
import { HardDeletePriceHistoryUseCase } from './application/commands/hard-PriceHistory.usecase';
import { SoftDeletePriceHistoryUseCase } from './application/commands/soft-PriceHistory.usecase';
import { RestorePriceHistoryUseCase } from './application/commands/restore-PriceHistory.usecase';
import { FindOnePriceHistoryUseCase } from './application/queries/findOne-PriceHistory.usecase';
import { FindAllPriceHistoryUseCase } from './application/queries/find-PriceHistory.usecase';
@Module({
  imports: [TypeOrmModule.forFeature([PriceHistoryOrm])],
  controllers: [PriceHistoryController],
  providers: [
    { provide: PRICE_HISTORY_REPOSITORY, useClass: PriceHistoryRepositoryImpl },
    CreatePriceHistoryUseCase,
    UpdatePriceHistoryUseCase,
    HardDeletePriceHistoryUseCase,
    SoftDeletePriceHistoryUseCase,
    RestorePriceHistoryUseCase,
    FindOnePriceHistoryUseCase,
    FindAllPriceHistoryUseCase,
  ],
})
export class PriceHistoryModule {}
