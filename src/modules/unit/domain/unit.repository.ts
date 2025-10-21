import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { Unit } from './unit.entity';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { IRemoveRepository } from 'src/shared/interface/removeRepository.interface';
export const UNIT_REPOSITORY = Symbol('UNIT_REPOSITORY');
export interface IUnitRepository extends IRemoveRepository {
  findAll(query: PaginationDto): Promise<PaginatedResponse<Unit>>;
  findById(id: number): Promise<Unit | null>;
  create(unit: Unit): Promise<Unit>;
  update(unit: Unit): Promise<Unit>;
  findByName(name: string): Promise<Unit | null>;
}
