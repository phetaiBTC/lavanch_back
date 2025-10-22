// import { Injectable } from '@nestjs/common';
// import { Repository } from 'typeorm';
// import { InjectRepository } from '@nestjs/typeorm';
// import { IProductVariantRepository } from '../domain/product_variant.repository';
// import { ProductVariant } from '../domain/product_variant.entity';
// import { ProductVariantMapper } from './product_variant.mapper';
// import { PaginationDto } from 'src/shared/dto/pagination.dto';
// import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
// import { fetchWithPagination } from 'src/shared/utils/pagination.util';
// import { ProductVariantOrm } from 'src/database/typeorm/product-variant.orm-entity';
// @Injectable()
// export class ProductVariantRepositoryImpl implements IProductVariantRepository {
//   constructor(
//     @InjectRepository(ProductVariantOrm)
//     private readonly product_variantRepo: Repository<ProductVariantOrm>,
//   ) {}
//   async findAll(
//     query: PaginationDto,
//   ): Promise<PaginatedResponse<ProductVariant>> {
//     const qb = this.product_variantRepo
//       .createQueryBuilder('product_variant')
//       .withDeleted();
//     return await fetchWithPagination({
//       qb,
//       page: query.page || 1,
//       type: query.type,
//       search: { kw: query.search, field: 'name' },
//       is_active: query.is_active,
//       sort: query.sort,
//       limit: query.limit || 10,
//       toDomain: ProductVariantMapper.toDomain,
//     });
//   }
//   async findById(id: number): Promise<ProductVariant | null> {
//     const product_variantEntity = await this.product_variantRepo.findOne({
//       where: { id },
//     });
//     return product_variantEntity
//       ? ProductVariantMapper.toDomain(product_variantEntity)
//       : null;
//   }
//   async create(product_variant: ProductVariant): Promise<ProductVariant> {
//     const entity = this.product_variantRepo.create(
//       ProductVariantMapper.toSchema(product_variant),
//     );
//     const saved = await this.product_variantRepo.save(entity);
//     return ProductVariantMapper.toDomain(saved);
//   }
//   async update(product_variant: ProductVariant): Promise<ProductVariant> {
//     const saved = await this.product_variantRepo.save(
//       ProductVariantMapper.toSchema(product_variant),
//     );
//     return ProductVariantMapper.toDomain(saved);
//   }
//   async hardDelete(id: number): Promise<{ message: string }> {
//     await this.product_variantRepo.delete(id);
//     return { message: 'hard delete sussessfully' };
//   }
//   async softDelete(id: number): Promise<{ message: string }> {
//     await this.product_variantRepo.softDelete(id);
//     return { message: 'soft delete sussessfully' };
//   }
//   async restore(id: number): Promise<{ message: string }> {
//     await this.product_variantRepo.restore(id);
//     return { message: 'restore sussessfully' };
//   }
// }


import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IProductVariantRepository } from '../domain/product_variant.repository';
import { ProductVariant } from '../domain/product_variant.entity';
import { ProductVariantMapper } from './product_variant.mapper';
import { ProductVariantOrm } from 'src/database/typeorm/product-variant.orm-entity';
import { BaseRepository } from 'src/shared/BaseModule/infrastructure/base.repository.impl';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';

@Injectable()
export class ProductVariantRepositoryImpl
  extends BaseRepository<ProductVariant, ProductVariantOrm, any>
  implements IProductVariantRepository
{
  constructor(
    @InjectRepository(ProductVariantOrm)
    private readonly productVariantRepo: Repository<ProductVariantOrm>,
  ) {
    super(productVariantRepo, ProductVariantMapper, 'product_variant', 'name');
  }

  async findAll(query: PaginationDto): Promise<PaginatedResponse<ProductVariant>> {
    return super.findAll(query);
  }
  async findByName(name: string): Promise<ProductVariant | null> {
    return this.findByField('name', name);
  }
}
