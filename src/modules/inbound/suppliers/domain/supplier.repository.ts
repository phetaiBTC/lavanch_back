import { EntityManager } from 'typeorm';
import { Supplier } from './supplier.entity';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { SupplierResponse } from '../interface/suppliers.interface';

export const SUPPLIER_REPOSITORY = Symbol('SUPPLIER_REPOSITORY');
export interface ISupplierRepository {
  save(domain: Supplier): Promise<void>;
  findById(id: number): Promise<SupplierResponse | null>;
  findAll(query: PaginationDto): Promise<PaginatedResponse<SupplierResponse>>;
  hardDelete(id: number[]): Promise<void>;
  softDelete(id: number[]): Promise<void>;
  restore(id: number[]): Promise<void>;
  loadById(id: number): Promise<Supplier | null>;
  load(id: number): Promise<Supplier | null>;
}
