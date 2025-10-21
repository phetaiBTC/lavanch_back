import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { CurrencyRates } from './currencyrates.entity';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { IRemoveRepository } from 'src/shared/interface/removeRepository.interface';
export const CURRENCYRATES_REPOSITORY = Symbol('CURRENCYRATES_REPOSITORY');
export interface ICurrencyRatesRepository extends IRemoveRepository {
  findAll(query: PaginationDto): Promise<PaginatedResponse<CurrencyRates>>;
  findById(id: number): Promise<CurrencyRates | null>;
  create(currencyrates: CurrencyRates): Promise<CurrencyRates>;
  update(currencyrates: CurrencyRates): Promise<CurrencyRates>;
}
