import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  CURRENCIES_REPOSITORY,
  type ICurrenciesRepository,
} from '../../domain/currencies.repository';
import { Currencies } from '../../domain/currencies.entity';
import { UpdateCurrenciesDto } from '../../dto/update-Currencies.dto';
import { FindOneCurrenciesUseCase } from '../queries/findOne-Currencies.usecase';

@Injectable()
export class UpdateCurrenciesUseCase {
  constructor(
    @Inject(CURRENCIES_REPOSITORY)
    private readonly currenciesRepo: ICurrenciesRepository,
    private readonly findOneCurrenciesUseCase: FindOneCurrenciesUseCase,
  ) {}

  async execute(id: number, dto: UpdateCurrenciesDto): Promise<Currencies> {
    const existing = await this.findOneCurrenciesUseCase.execute(id);

    if (dto.code && dto.code !== existing.value.code) {
      await this.ensureUniqueCode(dto.code);
    }

    const updated: Currencies = existing.update(dto);
    return this.currenciesRepo.save(updated);
  }

  private async ensureUniqueCode(code: string) {
    if (await this.currenciesRepo.findByCode(code))
      throw new BadRequestException('Currency already exists');
  }
}
