import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { Currencies } from './currencies.entity';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { IRemoveRepository } from 'src/shared/interface/removeRepository.interface';
export const CURRENCIES_REPOSITORY = Symbol('CURRENCIES_REPOSITORY');
export interface ICurrenciesRepository extends IRemoveRepository {
  findAll(query: PaginationDto): Promise<PaginatedResponse<Currencies>>;
  findById(id: number): Promise<Currencies | null>;
  create(currencies: Currencies): Promise<Currencies>;
  update(currencies: Currencies): Promise<Currencies>;
  findByCode(code: string): Promise<Currencies | null>;
}
