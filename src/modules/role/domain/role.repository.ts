import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { Role } from './role.entity';

export const ROLE_REPOSITORY = Symbol('ROLE_REPOSITORY');

export interface IRoleRepository {
  findAll(query: PaginationDto): Promise<PaginatedResponse<Role>>;
  save(role: Role): Promise<Role>;
  findOne(id: number): Promise<Role | null>;
  findByCode(code: string): Promise<Role | null>;
  hardDelete(id: number): Promise<{ message: string }>;
  softDelete(id: number): Promise<{ message: string }>;
  restore(id: number): Promise<{ message: string }>;
}
