import { Stock_adjustments } from './stock_adjustments.entity';
import { IBaseRepository } from 'src/shared/BaseModule/domain/base.repository';

export const STOCK_ADJUSTMENTS_REPOSITORY = Symbol('STOCK_ADJUSTMENTS_REPOSITORY');
export interface IStock_adjustmentsRepository extends IBaseRepository<Stock_adjustments> {}