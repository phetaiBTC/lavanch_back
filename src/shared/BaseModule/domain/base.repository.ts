
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';

export interface IBaseRepository<TDomain> {
  findAll(query: PaginationDto): Promise<PaginatedResponse<TDomain>>;
  findById(id: number): Promise<TDomain | null>;
  save(domain: TDomain): Promise<TDomain>;
  hardDelete(id: number): Promise<{ message: string }>;
  softDelete(id: number): Promise<{ message: string }>;
  restore(id: number): Promise<{ message: string }>;
}