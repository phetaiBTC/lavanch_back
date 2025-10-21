import { PaginatedResponse } from 'src/shared/interface/pagination.interface';import { ProductUnit } from './product_unit.entity';import { PaginationDto } from 'src/shared/dto/pagination.dto';import { IRemoveRepository } from 'src/shared/interface/removeRepository.interface';
export const PRODUCT_UNIT_REPOSITORY = Symbol('PRODUCT_UNIT_REPOSITORY');
export interface IProductUnitRepository extends IRemoveRepository {
findAll(query: PaginationDto): Promise<PaginatedResponse<ProductUnit>>;
findById(id: number): Promise<ProductUnit | null>;
create(product_unit: ProductUnit): Promise<ProductUnit>;
update(product_unit: ProductUnit): Promise<ProductUnit>;}