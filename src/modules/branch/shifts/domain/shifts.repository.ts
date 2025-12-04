import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { Shifts } from './shifts.entity';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { IRemoveRepository } from 'src/shared/interface/removeRepository.interface';

export const SHIFTS_REPOSITORY = Symbol('SHIFTS_REPOSITORY');

export interface IShiftsRepository extends IRemoveRepository {
  findAll(query: PaginationDto): Promise<PaginatedResponse<Shifts>>;
  findById(id: number): Promise<Shifts | null>;
  create(shifts: Shifts): Promise<Shifts>;
  update(shifts: Shifts): Promise<Shifts>;
}
