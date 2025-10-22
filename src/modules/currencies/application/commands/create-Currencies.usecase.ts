import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  CURRENCIES_REPOSITORY,
  type ICurrenciesRepository,
} from '../../domain/currencies.repository';
import { Currencies } from '../../domain/currencies.entity';
import { CreateCurrenciesDto } from '../../dto/create-Currencies.dto';
@Injectable()
export class CreateCurrenciesUseCase {
  constructor(
    @Inject(CURRENCIES_REPOSITORY)
    private readonly currenciesRepo: ICurrenciesRepository,
  ) {}
  async execute(dto: CreateCurrenciesDto): Promise<Currencies> {
    await this.ensureUniqueCode(dto.code);
    return this.currenciesRepo.save(new Currencies(dto));
  }

  private async ensureUniqueCode(code: string) {
    if (await this.currenciesRepo.findByCode(code))
      throw new BadRequestException('Currency already exists');
  }
}