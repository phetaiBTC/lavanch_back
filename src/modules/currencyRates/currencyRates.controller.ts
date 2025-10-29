import { Controller } from '@nestjs/common';
import { CreateCurrencyRatesDto } from './dto/create-CurrencyRates.dto';
import { UpdateCurrencyRatesDto } from './dto/update-CurrencyRates.dto';
import { CreateCurrencyRatesUseCase } from './application/commands/create-CurrencyRates.usecase';
import { UpdateCurrencyRatesUseCase } from './application/commands/update-CurrencyRates.usecase';
import { HardDeleteCurrencyRatesUseCase } from './application/commands/hard-CurrencyRates.usecase';
import { SoftDeleteCurrencyRatesUseCase } from './application/commands/soft-CurrencyRates.usecase';
import { RestoreCurrencyRatesUseCase } from './application/commands/restore-CurrencyRates.usecase';
import { FindOneCurrencyRatesUseCase } from './application/queries/findOne-CurrencyRates.usecase';
import { FindAllCurrencyRatesUseCase } from './application/queries/find-CurrencyRates.usecase';
import { CurrencyRatesMapper } from './infrastructure/currencyrates.mapper';
import { CurrencyRatesResponse } from './interface/currencyrates.interface';
import { BaseController } from 'src/shared/BaseModule/BaseController';
import { CurrencyRatesOrm } from 'src/database/typeorm/currencyRates.orm-entity';
import { CurrencyRates } from './domain/currencyrates.entity';

@Controller('currencyrates')
export class CurrencyRatesController extends BaseController<
  CurrencyRates,
  CurrencyRatesOrm,
  CurrencyRatesResponse,
  CreateCurrencyRatesDto,
  UpdateCurrencyRatesDto
> {
  constructor(
    protected readonly createCurrencyRatesUseCase: CreateCurrencyRatesUseCase,
    protected readonly updateCurrencyRatesUseCase: UpdateCurrencyRatesUseCase,
    protected readonly hardDeleteCurrencyRatesUseCase: HardDeleteCurrencyRatesUseCase,
    protected readonly softDeleteCurrencyRatesUseCase: SoftDeleteCurrencyRatesUseCase,
    protected readonly restoreCurrencyRatesUseCase: RestoreCurrencyRatesUseCase,
    protected readonly findOneCurrencyRatesUseCase: FindOneCurrencyRatesUseCase,
    protected readonly findAllCurrencyRatesUseCase: FindAllCurrencyRatesUseCase,
  ) {
    super(
      CurrencyRatesMapper,
      createCurrencyRatesUseCase,
      updateCurrencyRatesUseCase,
      findOneCurrencyRatesUseCase,
      findAllCurrencyRatesUseCase,
      hardDeleteCurrencyRatesUseCase,
      softDeleteCurrencyRatesUseCase,
      restoreCurrencyRatesUseCase,
    );
  }
}
