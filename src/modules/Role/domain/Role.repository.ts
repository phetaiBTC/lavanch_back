import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { Role } from './Role.entity';

export const Role_REPOSITORY = Symbol('Role_REPOSITORY'.toLocaleUpperCase());

export interface IRoleRepository {
  findAll(query: PaginationDto): Promise<PaginatedResponse<Role>>;
  save(role: Role): Promise<Role>;
  findOne(id: number): Promise<Role | null>;
  hardDelete(id: number): Promise<{ message: string }>;
  softDelete(id: number): Promise<{ message: string }>;
  restore(id: number): Promise<{ message: string }>;
  findByCode(code: string): Promise<Role | null>;
}
