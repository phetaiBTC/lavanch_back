import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  CURRENCYRATES_REPOSITORY,
  type ICurrencyRatesRepository,
} from '../../domain/currencyrates.repository';
import { CurrencyRates } from '../../domain/currencyrates.entity';
import { CreateCurrencyRatesDto } from '../../dto/create-CurrencyRates.dto';
import { FindOneCurrenciesUseCase } from 'src/modules/currencies/application/queries/findOne-Currencies.usecase';
@Injectable()
export class CreateCurrencyRatesUseCase {
  constructor(
    @Inject(CURRENCYRATES_REPOSITORY)
    private readonly currencyratesRepo: ICurrencyRatesRepository,
    private readonly findOneCurrencyUseCase: FindOneCurrenciesUseCase,
  ) {}

  async execute(dto: CreateCurrencyRatesDto): Promise<CurrencyRates> {
    const [from, to] = await Promise.all([
      this.findOneCurrencyUseCase.execute(dto.from_currency_id),
      this.findOneCurrencyUseCase.execute(dto.to_currency_id),
    ]);

    if (!from || !to) throw new NotFoundException('Currency not found');

    return this.currencyratesRepo.save(
      new CurrencyRates({ ...dto, from_currency_id: from, to_currency_id: to }),
    );
  }
}
