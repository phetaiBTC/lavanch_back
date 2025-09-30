import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { Role } from './Role.entity';


export const Role_REPOSITORY = Symbol('Role_REPOSITORY'.toLocaleUpperCase());

export interface IRoleRepository {
  findAll(query: PaginationDto): Promise<PaginatedResponse<Role>>;
}
