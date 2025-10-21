import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  CURRENCYRATES_REPOSITORY,
  type ICurrencyRatesRepository,
} from '../../domain/currencyrates.repository';
import { CurrencyRates } from '../../domain/currencyrates.entity';
import { FindOneCurrenciesUseCase } from 'src/modules/currencies/application/queries/findOne-Currencies.usecase';
import { FindOneCurrencyRatesUseCase } from '../queries/findOne-CurrencyRates.usecase';
import { UpdateCurrencyRatesDto } from '../../dto/update-CurrencyRates.dto';
@Injectable()
export class UpdateCurrencyRatesUseCase {
  constructor(
    @Inject(CURRENCYRATES_REPOSITORY)
    private readonly currencyratesRepo: ICurrencyRatesRepository,
    private readonly findOneCurrencyUseCase: FindOneCurrenciesUseCase,
    private readonly findOneCurrencyRatesUseCase: FindOneCurrencyRatesUseCase,
  ) {}

  async execute(
    id: number,
    dto: UpdateCurrencyRatesDto,
  ): Promise<CurrencyRates> {
    const [from, to] = await Promise.all([
      this.findOneCurrencyUseCase.execute(dto.from_currency_id),
      this.findOneCurrencyUseCase.execute(dto.to_currency_id),
    ]);

    if (!from || !to) throw new NotFoundException('Currency not found');
    const existing = await this.findOneCurrencyRatesUseCase.execute(id);
    if (!existing) throw new NotFoundException('CurrencyRates not found');

    const updated: CurrencyRates = existing.update({
      ...dto,
      from_currency_id: from,
      to_currency_id: to,
    });
    return this.currencyratesRepo.update(updated);
  }
}
