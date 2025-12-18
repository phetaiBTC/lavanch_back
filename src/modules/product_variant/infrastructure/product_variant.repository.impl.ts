import { Injectable } from '@nestjs/common';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IProductVariantRepository } from '../domain/product_variant.repository';
import { ProductVariant } from '../domain/product_variant.entity';
import { ProductVariantMapper } from './product_variant.mapper';
import { ProductVariantOrm } from 'src/database/typeorm/product-variant.orm-entity';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { BaseRepository } from 'src/shared/BaseModule/infrastructure/base.repository.impl';
import { ProductVariantResponse } from '../interface/product_variant.interface';

@Injectable()
export class ProductVariantRepositoryImpl
  extends BaseRepository<
    ProductVariant,
    ProductVariantOrm,
    ProductVariantResponse
  >
  implements IProductVariantRepository
{
  constructor(
    @InjectRepository(ProductVariantOrm)
    private readonly productVariantRepo: Repository<ProductVariantOrm>,
  ) {
    super({
      repository: productVariantRepo,
      mapper: ProductVariantMapper,
      searchField: 'name',
    });
  }
  override createQueryBuilder(): SelectQueryBuilder<ProductVariantOrm> {
    return this.productVariantRepo.createQueryBuilder('product_variant');
  }
  async findAll(
    query: PaginationDto,
  ): Promise<PaginatedResponse<ProductVariant>> {
    return super.findAll(query);
  }
  async findByName(name: string): Promise<ProductVariant | null> {
    return this.findByField('name', name);
  }
  async findByBarcode(barcode: string): Promise<ProductVariant | null> {
    return this.findByField('barcode', barcode);
  }
}
