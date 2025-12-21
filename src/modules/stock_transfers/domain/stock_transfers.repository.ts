import { Stock_transfers } from './stock_transfers.entity';
import { IBaseRepository } from 'src/shared/BaseModule/domain/base.repository';

export const STOCK_TRANSFERS_REPOSITORY = Symbol('STOCK_TRANSFERS_REPOSITORY');
export interface IStock_transfersRepository extends IBaseRepository<Stock_transfers> {}