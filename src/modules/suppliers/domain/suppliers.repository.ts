import { IBaseRepository } from 'src/shared/BaseModule/domain/base.repository';
import { Suppliers } from './suppliers.entity';

export const SUPPLIERS_REPOSITORY = Symbol('SUPPLIERS_REPOSITORY');

export interface ISuppliersRepository extends IBaseRepository<Suppliers> {}
