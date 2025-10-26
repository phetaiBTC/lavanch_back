import { PriceHistory } from './price_history.entity';
import { IBaseRepository } from 'src/shared/BaseModule/domain/base.repository';
export const PRICE_HISTORY_REPOSITORY = Symbol('PRICE_HISTORY_REPOSITORY');
export interface IPriceHistoryRepository
  extends IBaseRepository<PriceHistory> {}
