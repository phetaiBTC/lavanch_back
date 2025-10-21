import { NotFoundException, Inject, Injectable } from '@nestjs/common';
import {
  CURRENCIES_REPOSITORY,
  type ICurrenciesRepository,
} from '../../domain/currencies.repository';
@Injectable()
export class SoftDeleteCurrenciesUseCase {
  constructor(
    @Inject(CURRENCIES_REPOSITORY)
    private readonly currenciesRepo: ICurrenciesRepository,
  ) {}
  async execute(id: number): Promise<{ message: string }> {
    const currencies = await this.currenciesRepo.findById(id);
    if (!currencies) throw new NotFoundException('Currencies not found');
    return this.currenciesRepo.softDelete(id);
  }
}
