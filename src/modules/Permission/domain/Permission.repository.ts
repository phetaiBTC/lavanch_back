import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { Permission } from './Permission.entity';

export const Permission_REPOSITORY = Symbol('Permission_REPOSITORY'.toLocaleUpperCase());

export interface IPermissionRepository {
  findAll(query: PaginationDto): Promise<PaginatedResponse<Permission>>;
  findOne(id: number): Promise<Permission | null>;
}
