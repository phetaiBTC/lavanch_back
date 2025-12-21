import { Stock_movements } from './stock_movements.entity';
import { IBaseRepository } from 'src/shared/BaseModule/domain/base.repository';

export const STOCK_MOVEMENTS_REPOSITORY = Symbol('STOCK_MOVEMENTS_REPOSITORY');
export interface IStock_movementsRepository extends IBaseRepository<Stock_movements> {}