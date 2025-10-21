import { PaginatedResponse } from 'src/shared/interface/pagination.interface';import { ProductLot } from './product_lot.entity';import { PaginationDto } from 'src/shared/dto/pagination.dto';import { IRemoveRepository } from 'src/shared/interface/removeRepository.interface';
export const PRODUCT_LOT_REPOSITORY = Symbol('PRODUCT_LOT_REPOSITORY');
export interface IProductLotRepository extends IRemoveRepository {
findAll(query: PaginationDto): Promise<PaginatedResponse<ProductLot>>;
findById(id: number): Promise<ProductLot | null>;
create(product_lot: ProductLot): Promise<ProductLot>;
update(product_lot: ProductLot): Promise<ProductLot>;}