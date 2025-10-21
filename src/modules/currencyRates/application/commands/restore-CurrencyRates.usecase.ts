import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  CURRENCYRATES_REPOSITORY,
  type ICurrencyRatesRepository,
} from '../../domain/currencyrates.repository';
@Injectable()
export class RestoreCurrencyRatesUseCase {
  constructor(
    @Inject(CURRENCYRATES_REPOSITORY)
    private readonly currencyratesRepo: ICurrencyRatesRepository,
  ) {}
  async execute(id: number): Promise<{ message: string }> {
    const currencyrates = await this.currencyratesRepo.findById(id);
    if (!currencyrates) throw new NotFoundException('CurrencyRates not found');
    return this.currencyratesRepo.restore(id);
  }
}
