import { NotFoundException, Inject, Injectable } from '@nestjs/common';
import {
  CURRENCIES_REPOSITORY,
  type ICurrenciesRepository,
} from '../../domain/currencies.repository';
import { FindOneCurrenciesUseCase } from '../queries/findOne-Currencies.usecase';
@Injectable()
export class SoftDeleteCurrenciesUseCase {
  constructor(
    @Inject(CURRENCIES_REPOSITORY)
    private readonly currenciesRepo: ICurrenciesRepository,
    private readonly findOneCurrenciesUseCase: FindOneCurrenciesUseCase,
  ) {}
  async execute(id: number[]): Promise<{ message: string }> {
    // await this.findOneCurrenciesUseCase.execute(id);
    await Promise.all(id.map((id) => this.findOneCurrenciesUseCase.execute(id)));
    return this.currenciesRepo.softDelete(id);
  }
}
