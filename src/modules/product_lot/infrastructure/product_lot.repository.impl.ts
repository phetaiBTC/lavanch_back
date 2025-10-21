// import { Injectable } from '@nestjs/common';
// import { Repository } from 'typeorm';
// import { InjectRepository } from '@nestjs/typeorm';
// import { ProductLotOrm } from 'src/database/typeorm/product_lot.orm-entity';
// import { IProductLotRepository } from '../domain/product_lot.repository';
// import { ProductLot } from '../domain/product_lot.entity';
// import { ProductLotMapper } from './product_lot.mapper';
// import { PaginationDto } from 'src/shared/dto/pagination.dto';
// import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
// import { fetchWithPagination } from 'src/shared/utils/pagination.util';
// @Injectable()
// export class ProductLotRepositoryImpl implements IProductLotRepository {
//   constructor(
//     @InjectRepository(ProductLotOrm)
//     private readonly product_lotRepo: Repository<ProductLotOrm>,
//   ) {}
//   async findAll(query: PaginationDto): Promise<PaginatedResponse<ProductLot>> {
//     const qb = this.product_lotRepo
//       .createQueryBuilder('product_lot')
//       .withDeleted();
//     return await fetchWithPagination({
//       qb,
//       page: query.page || 1,
//       type: query.type,
//       search: { kw: query.search, field: 'name' },
//       is_active: query.is_active,
//       sort: query.sort,
//       limit: query.limit || 10,
//       toDomain: ProductLotMapper.toDomain,
//     });
//   }
//   async findById(id: number): Promise<ProductLot | null> {
//     const product_lotEntity = await this.product_lotRepo.findOne({
//       where: { id },
//     });
//     return product_lotEntity
//       ? ProductLotMapper.toDomain(product_lotEntity)
//       : null;
//   }
//   async create(product_lot: ProductLot): Promise<ProductLot> {
//     const entity = this.product_lotRepo.create(
//       ProductLotMapper.toSchema(product_lot),
//     );
//     const saved = await this.product_lotRepo.save(entity);
//     return ProductLotMapper.toDomain(saved);
//   }
//   async update(product_lot: ProductLot): Promise<ProductLot> {
//     const saved = await this.product_lotRepo.save(
//       ProductLotMapper.toSchema(product_lot),
//     );
//     return ProductLotMapper.toDomain(saved);
//   }
//   async hardDelete(id: number): Promise<{ message: string }> {
//     await this.product_lotRepo.delete(id);
//     return { message: 'hard delete sussessfully' };
//   }
//   async softDelete(id: number): Promise<{ message: string }> {
//     await this.product_lotRepo.softDelete(id);
//     return { message: 'soft delete sussessfully' };
//   }
//   async restore(id: number): Promise<{ message: string }> {
//     await this.product_lotRepo.restore(id);
//     return { message: 'restore sussessfully' };
//   }
// }

import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IProductLotRepository } from '../domain/product_lot.repository';
import { ProductLot } from '../domain/product_lot.entity';
import { ProductLotMapper } from './product_lot.mapper';
import { ProductLotOrm } from 'src/database/typeorm/product_lot.orm-entity';
import { BaseRepository } from 'src/shared/ฺRepository/BaseRepository';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';

@Injectable()
export class ProductLotRepositoryImpl
  extends BaseRepository<ProductLot, ProductLotOrm, any>
  implements IProductLotRepository
{
  constructor(
    @InjectRepository(ProductLotOrm)
    private readonly productLotRepo: Repository<ProductLotOrm>,
  ) {
    super(productLotRepo, ProductLotMapper, 'product_lot', 'name');
  }
  async findAll(query: PaginationDto): Promise<PaginatedResponse<ProductLot>> {
    return super.findAll(query);
  }
}
