import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { Role } from './role.entity';
import { IRemoveRepository } from 'src/shared/interface/removeRepository.interface';

export const ROLE_REPOSITORY = Symbol('ROLE_REPOSITORY');

export interface IRoleRepository extends IRemoveRepository {
  findAll(query: PaginationDto): Promise<PaginatedResponse<Role>>;
  save(role: Role): Promise<Role>;
  findOne(id: number): Promise<Role | null>;
  findByCode(code: string): Promise<Role | null>;
}
