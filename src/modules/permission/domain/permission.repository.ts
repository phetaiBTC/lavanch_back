import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { Permission } from './permission.entity';

export const PERMISSION_REPOSITORY = Symbol('PERMISSION_REPOSITORY');

export interface IPermissionRepository {
  findAll(query: PaginationDto): Promise<PaginatedResponse<Permission>>;
  findOne(id: number): Promise<Permission | null>;
}
