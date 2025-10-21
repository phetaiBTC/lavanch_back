import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurrencyRatesRepositoryImpl } from './infrastructure/currencyrates.repository.impl';
import { CurrencyRatesController } from './currencyRates.controller';
import { CURRENCYRATES_REPOSITORY } from './domain/currencyrates.repository';
import { CurrencyRatesOrm } from 'src/database/typeorm/currencyRates.orm-entity';
import { CreateCurrencyRatesUseCase } from './application/commands/create-CurrencyRates.usecase';
import { UpdateCurrencyRatesUseCase } from './application/commands/update-CurrencyRates.usecase';
import { HardDeleteCurrencyRatesUseCase } from './application/commands/hard-CurrencyRates.usecase';
import { SoftDeleteCurrencyRatesUseCase } from './application/commands/soft-CurrencyRates.usecase';
import { RestoreCurrencyRatesUseCase } from './application/commands/restore-CurrencyRates.usecase';
import { FindOneCurrencyRatesUseCase } from './application/queries/findOne-CurrencyRates.usecase';
import { FindAllCurrencyRatesUseCase } from './application/queries/find-CurrencyRates.usecase';
import { CurrenciesModule } from '../currencies/currencies.module';
@Module({
  imports: [TypeOrmModule.forFeature([CurrencyRatesOrm]), CurrenciesModule],
  controllers: [CurrencyRatesController],
  providers: [
    {
      provide: CURRENCYRATES_REPOSITORY,
      useClass: CurrencyRatesRepositoryImpl,
    },
    CreateCurrencyRatesUseCase,
    UpdateCurrencyRatesUseCase,
    HardDeleteCurrencyRatesUseCase,
    SoftDeleteCurrencyRatesUseCase,
    RestoreCurrencyRatesUseCase,
    FindOneCurrencyRatesUseCase,
    FindAllCurrencyRatesUseCase,
  ],
})
export class CurrencyRatesModule {}
