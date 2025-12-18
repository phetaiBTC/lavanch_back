import { Role } from './role.entity';
import { IBaseRepository } from 'src/shared/BaseModule/domain/base.repository';

export const ROLE_REPOSITORY = Symbol('ROLE_REPOSITORY');

export interface IRoleRepository extends IBaseRepository<Role> {
  // findAll(query: PaginationDto): Promise<PaginatedResponse<Role>>;
  // save(role: Role): Promise<Role>;
  // findOne(id: number): Promise<Role | null>;
  findByName(name: string): Promise<Role | null>;
  findByCode(code: string): Promise<Role | null>;
  // hardDelete(id: number): Promise<{ message: string }>;
  // softDelete(id: number): Promise<{ message: string }>;
  // restore(id: number): Promise<{ message: string }>;
}
