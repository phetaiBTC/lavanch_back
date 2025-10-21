import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurrenciesRepositoryImpl } from './infrastructure/currencies.repository.impl';
import { CurrenciesController } from './currencies.controller';
import { CURRENCIES_REPOSITORY } from './domain/currencies.repository';
import { CurrenciesOrm } from 'src/database/typeorm/currencies.orm-entity';
import { CreateCurrenciesUseCase } from './application/commands/create-Currencies.usecase';
import { HardDeleteCurrenciesUseCase } from './application/commands/hard-Currencies.usecase';
import { SoftDeleteCurrenciesUseCase } from './application/commands/soft-Currencies.usecase';
import { RestoreCurrenciesUseCase } from './application/commands/restore-Currencies.usecase';
import { FindOneCurrenciesUseCase } from './application/queries/findOne-Currencies.usecase';
import { FindAllCurrenciesUseCase } from './application/queries/find-Currencies.usecase';
import { UpdateCurrenciesUseCase } from './application/commands/update-Currencies.usecase';
@Module({
  imports: [TypeOrmModule.forFeature([CurrenciesOrm])],
  controllers: [CurrenciesController],
  providers: [
    { provide: CURRENCIES_REPOSITORY, useClass: CurrenciesRepositoryImpl },
    CreateCurrenciesUseCase,
    UpdateCurrenciesUseCase,
    HardDeleteCurrenciesUseCase,
    SoftDeleteCurrenciesUseCase,
    RestoreCurrenciesUseCase,
    FindOneCurrenciesUseCase,
    FindAllCurrenciesUseCase,
  ],
  exports: [FindOneCurrenciesUseCase],
})
export class CurrenciesModule {}
