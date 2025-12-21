import { Branch_stocks } from './branch_stocks.entity';
import { IBaseRepository } from 'src/shared/BaseModule/domain/base.repository';

export const BRANCH_STOCKS_REPOSITORY = Symbol('BRANCH_STOCKS_REPOSITORY');
export interface IBranch_stocksRepository extends IBaseRepository<Branch_stocks> {}