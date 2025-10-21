import { PaginatedResponse } from 'src/shared/interface/pagination.interface';import { ProductPoint } from './product_point.entity';import { PaginationDto } from 'src/shared/dto/pagination.dto';import { IRemoveRepository } from 'src/shared/interface/removeRepository.interface';
export const PRODUCT_POINT_REPOSITORY = Symbol('PRODUCT_POINT_REPOSITORY');
export interface IProductPointRepository extends IRemoveRepository {
findAll(query: PaginationDto): Promise<PaginatedResponse<ProductPoint>>;
findById(id: number): Promise<ProductPoint | null>;
create(product_point: ProductPoint): Promise<ProductPoint>;
update(product_point: ProductPoint): Promise<ProductPoint>;
findByProductVariantAndUnit(product_variant_id: number, unit_id: number): Promise<ProductPoint | null>;}