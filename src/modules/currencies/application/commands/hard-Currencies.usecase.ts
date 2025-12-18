import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  CURRENCIES_REPOSITORY,
  type ICurrenciesRepository,
} from '../../domain/currencies.repository';
import { FindOneCurrenciesUseCase } from '../queries/findOne-Currencies.usecase';
@Injectable()
export class HardDeleteCurrenciesUseCase {
  constructor(
    @Inject(CURRENCIES_REPOSITORY)
    private readonly currenciesRepo: ICurrenciesRepository,
    private readonly findOneCurrenciesUseCase: FindOneCurrenciesUseCase,
  ) {}
  async execute(id: number[]): Promise<{ message: string }> {
    await Promise.all(id.map((id) => this.findOneCurrenciesUseCase.execute(id)));
    // await this.findOneCurrenciesUseCase.execute(id);
    return this.currenciesRepo.hardDelete(id);
  }
}
