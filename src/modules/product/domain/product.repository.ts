import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { Product } from './product.entity';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { IRemoveRepository } from 'src/shared/interface/removeRepository.interface';
export const PRODUCT_REPOSITORY = Symbol('PRODUCT_REPOSITORY');
export interface IProductRepository extends IRemoveRepository {
  findAll(query: PaginationDto): Promise<PaginatedResponse<Product>>;
  findById(id: number): Promise<Product | null>;
  create(product: Product): Promise<Product>;
  update(product: Product): Promise<Product>;
  findName(name: string): Promise<Product | null>;
  findByBarcode(barcode: string): Promise<Product | null>;
}
