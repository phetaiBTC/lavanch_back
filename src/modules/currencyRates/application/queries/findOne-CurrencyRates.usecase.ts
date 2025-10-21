import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  CURRENCYRATES_REPOSITORY,
  type ICurrencyRatesRepository,
} from '../../domain/currencyrates.repository';
import { CurrencyRates } from '../../domain/currencyrates.entity';
@Injectable()
export class FindOneCurrencyRatesUseCase {
  constructor(
    @Inject(CURRENCYRATES_REPOSITORY)
    private readonly currencyratesRepo: ICurrencyRatesRepository,
  ) {}
  async execute(id: number): Promise<CurrencyRates> {
    const currencyrates = await this.currencyratesRepo.findById(id);
    if (!currencyrates) throw new NotFoundException('CurrencyRates not found');
    return currencyrates;
  }
}
