import { CurrencyRates } from './currencyrates.entity';
import { IBaseRepository } from 'src/shared/BaseModule/domain/base.repository';
export const CURRENCYRATES_REPOSITORY = Symbol('CURRENCYRATES_REPOSITORY');
export interface ICurrencyRatesRepository
  extends IBaseRepository<CurrencyRates> {}
