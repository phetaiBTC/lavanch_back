import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { ProductVariant } from './product_variant.entity';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { IRemoveRepository } from 'src/shared/interface/removeRepository.interface';
export const PRODUCT_VARIANT_REPOSITORY = Symbol('PRODUCT_VARIANT_REPOSITORY');
export interface IProductVariantRepository extends IRemoveRepository {
  findAll(query: PaginationDto): Promise<PaginatedResponse<ProductVariant>>;
  findById(id: number): Promise<ProductVariant | null>;
  create(product_variant: ProductVariant): Promise<ProductVariant>;
  update(product_variant: ProductVariant): Promise<ProductVariant>;
}
