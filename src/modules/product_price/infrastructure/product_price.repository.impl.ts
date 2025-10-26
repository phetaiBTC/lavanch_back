import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductPriceOrm } from 'src/database/typeorm/product_price.orm-entity';
import { IProductPriceRepository } from '../domain/product_price.repository';
import { ProductPrice } from '../domain/product_price.entity';
import { ProductPriceMapper } from './product_price.mapper';
import { BaseRepository } from 'src/shared/BaseModule/infrastructure/base.repository.impl';
import { ProductPriceResponse } from '../interface/product_price.interface';
@Injectable()
export class ProductPriceRepositoryImpl
  extends BaseRepository<ProductPrice, ProductPriceOrm, ProductPriceResponse>
  implements IProductPriceRepository
{
  constructor(
    @InjectRepository(ProductPriceOrm)
    protected readonly product_priceRepo: Repository<ProductPriceOrm>,
  ) {
    super(product_priceRepo, ProductPriceMapper, 'product_price');
  }
  async findByUniqueCombination(
    product_variant_id: number,
    unit_id: number,
    effective_date: Date,
  ): Promise<ProductPrice | null> {
    const entity = await this.repository.findOne({
      where: {
        product_variant: { id: product_variant_id },
        unit: { id: unit_id },
        effective_date: effective_date,
      },
      relations: ['product_variant', 'unit'],
    });
    return entity ? this.mapper.toDomain(entity) : null;
  }
}
