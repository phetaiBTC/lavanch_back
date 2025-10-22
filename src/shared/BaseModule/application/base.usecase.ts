import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';

// Base Use Cases Interfaces
export interface ICreateUseCase<TDto, TDomain> {
  execute(dto: TDto): Promise<TDomain>;
}

export interface IUpdateUseCase<TDto, TDomain> {
  execute(id: number, dto: TDto): Promise<TDomain>;
}

export interface IFindOneUseCase<TDomain> {
  execute(id: number): Promise<TDomain>;
}

export interface IFindAllUseCase<TDomain> {
  execute(query: PaginationDto): Promise<PaginatedResponse<TDomain>>;
}

export interface IDeleteUseCase {
  execute(id: number): Promise<{ message: string }>;
}

export interface IRestoreUseCase {
  execute(id: number): Promise<{ message: string }>;
}