import { Unit } from './unit.entity';
import { IBaseRepository } from 'src/shared/BaseModule/domain/base.repository';
export const UNIT_REPOSITORY = Symbol('UNIT_REPOSITORY');
export interface IUnitRepository extends IBaseRepository<Unit> {
  findByName(name: string): Promise<Unit | null>;
}
