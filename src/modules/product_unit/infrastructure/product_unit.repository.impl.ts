// import { Injectable } from '@nestjs/common';
// import { Repository } from 'typeorm';
// import { InjectRepository } from '@nestjs/typeorm';
// import { IProductUnitRepository } from '../domain/product_unit.repository';
// import { ProductUnit } from '../domain/product_unit.entity';
// import { ProductUnitMapper } from './product_unit.mapper';
// import { PaginationDto } from 'src/shared/dto/pagination.dto';
// import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
// import { fetchWithPagination } from 'src/shared/utils/pagination.util';
// import { ProductUnitOrm } from 'src/database/typeorm/product-unit.orm-entity';
// @Injectable()
// export class ProductUnitRepositoryImpl implements IProductUnitRepository {
//   constructor(
//     @InjectRepository(ProductUnitOrm)
//     private readonly product_unitRepo: Repository<ProductUnitOrm>,
//   ) {}
//   async findAll(query: PaginationDto): Promise<PaginatedResponse<ProductUnit>> {
//     const qb = this.product_unitRepo
//       .createQueryBuilder('product_unit')
//       .leftJoinAndSelect('product_unit.unit', 'unit')
//       .leftJoinAndSelect('product_unit.product_variant', 'product_variant')
//       .leftJoinAndSelect('product_variant.product', 'product')
//       .withDeleted();
//     return await fetchWithPagination({
//       qb,
//       page: query.page || 1,
//       type: query.type,
//       search: { kw: query.search, field: 'name' },
//       is_active: query.is_active,
//       sort: query.sort,
//       limit: query.limit || 10,
//       toDomain: ProductUnitMapper.toDomain,
//     });
//   }
//   async findById(id: number): Promise<ProductUnit | null> {
//     const product_unitEntity = await this.product_unitRepo.findOne({
//       where: { id },
//     });
//     return product_unitEntity
//       ? ProductUnitMapper.toDomain(product_unitEntity)
//       : null;
//   }
//   async create(product_unit: ProductUnit): Promise<ProductUnit> {
//     const entity = this.product_unitRepo.create(
//       ProductUnitMapper.toSchema(product_unit),
//     );
//     const saved = await this.product_unitRepo.save(entity);
//     return ProductUnitMapper.toDomain(saved);
//   }
//   async update(product_unit: ProductUnit): Promise<ProductUnit> {
//     const saved = await this.product_unitRepo.save(
//       ProductUnitMapper.toSchema(product_unit),
//     );
//     return ProductUnitMapper.toDomain(saved);
//   }
//   async hardDelete(id: number): Promise<{ message: string }> {
//     await this.product_unitRepo.delete(id);
//     return { message: 'hard delete sussessfully' };
//   }
//   async softDelete(id: number): Promise<{ message: string }> {
//     await this.product_unitRepo.softDelete(id);
//     return { message: 'soft delete sussessfully' };
//   }
//   async restore(id: number): Promise<{ message: string }> {
//     await this.product_unitRepo.restore(id);
//     return { message: 'restore sussessfully' };
//   }
// }


import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IProductUnitRepository } from '../domain/product_unit.repository';
import { ProductUnit } from '../domain/product_unit.entity';
import { ProductUnitMapper } from './product_unit.mapper';
import { ProductUnitOrm } from 'src/database/typeorm/product-unit.orm-entity';
import { BaseRepository } from 'src/shared/ฺRepository/BaseRepository';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';

@Injectable()
export class ProductUnitRepositoryImpl
  extends BaseRepository<ProductUnit, ProductUnitOrm, any>
  implements IProductUnitRepository
{
  constructor(
    @InjectRepository(ProductUnitOrm)
    private readonly productUnitRepo: Repository<ProductUnitOrm>,
  ) {
    super(productUnitRepo, ProductUnitMapper, 'product_unit', 'name');
  }

  async findAll(query: PaginationDto): Promise<PaginatedResponse<ProductUnit>> {
    return super.findAll(query, [
      { relation: 'product_unit.unit', as: 'unit' },
      { relation: 'product_unit.product_variant', as: 'product_variant' },
      { relation: 'product_variant.product', as: 'product' },
    ]);
  }
  async findByProductVariantAndUnit(
    product_variant_id: number,
    unit_id: number,
  ): Promise<ProductUnit | null> {
    const entity = await this.productUnitRepo
      .createQueryBuilder('product_unit')
      .where('product_unit.product_variant = :product_variant_id', {
        product_variant_id,
      })
      .andWhere('product_unit.unit = :unit_id', { unit_id })
      .getOne();

    return entity ? ProductUnitMapper.toDomain(entity) : null;
  }
}
