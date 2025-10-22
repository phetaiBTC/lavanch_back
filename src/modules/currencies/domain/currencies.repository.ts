import { Currencies } from './currencies.entity';
import { IBaseRepository } from 'src/shared/BaseModule/domain/base.repository';

export const CURRENCIES_REPOSITORY = Symbol('CURRENCIES_REPOSITORY');

export interface ICurrenciesRepository extends IBaseRepository<Currencies> {
  findByCode(code: string): Promise<Currencies | null>;
}
