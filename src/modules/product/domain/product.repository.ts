import { Product } from './product.entity';
import { IBaseRepository } from 'src/shared/BaseModule/domain/base.repository';
export const PRODUCT_REPOSITORY = Symbol('PRODUCT_REPOSITORY');
export interface IProductRepository extends IBaseRepository<Product> {
  findName(name: string): Promise<Product | null>;
  findByBarcode(barcode: string): Promise<Product | null>;
}
