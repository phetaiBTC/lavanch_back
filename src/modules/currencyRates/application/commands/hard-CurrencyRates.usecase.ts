import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  CURRENCYRATES_REPOSITORY,
  type ICurrencyRatesRepository,
} from '../../domain/currencyrates.repository';
import { FindOneCurrencyRatesUseCase } from '../queries/findOne-CurrencyRates.usecase';
@Injectable()
export class HardDeleteCurrencyRatesUseCase {
  constructor(
    @Inject(CURRENCYRATES_REPOSITORY)
    private readonly currencyratesRepo: ICurrencyRatesRepository,
    private readonly findOneCurrencyRatesUseCase: FindOneCurrencyRatesUseCase,
  ) {}
  async execute(id: number): Promise<{ message: string }> {
    await this.findOneCurrencyRatesUseCase.execute(id);
    return this.currencyratesRepo.hardDelete(id);
  }
}
