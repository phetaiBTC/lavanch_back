import { Inject, Injectable } from '@nestjs/common';
import {
  CURRENCYRATES_REPOSITORY,
  type ICurrencyRatesRepository,
} from '../../domain/currencyrates.repository';
import { CurrencyRates } from '../../domain/currencyrates.entity';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
@Injectable()
export class FindAllCurrencyRatesUseCase {
  constructor(
    @Inject(CURRENCYRATES_REPOSITORY)
    private readonly currencyratesRepo: ICurrencyRatesRepository,
  ) {}
  async execute(
    query: PaginationDto,
  ): Promise<PaginatedResponse<CurrencyRates>> {
    return await this.currencyratesRepo.findAll(query);
  }
}
