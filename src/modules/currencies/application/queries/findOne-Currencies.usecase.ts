import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  CURRENCIES_REPOSITORY,
  type ICurrenciesRepository,
} from '../../domain/currencies.repository';
import { Currencies } from '../../domain/currencies.entity';
@Injectable()
export class FindOneCurrenciesUseCase {
  constructor(
    @Inject(CURRENCIES_REPOSITORY)
    private readonly currenciesRepo: ICurrenciesRepository,
  ) {}
  async execute(id: number): Promise<Currencies> {
    const currencies = await this.currenciesRepo.findById(id);
    if (!currencies) throw new NotFoundException('Currencies not found');
    return currencies;
  }
}
