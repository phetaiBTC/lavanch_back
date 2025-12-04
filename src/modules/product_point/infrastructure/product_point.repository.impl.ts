import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IProductPointRepository } from '../domain/product_point.repository';
import { ProductPoint } from '../domain/product_point.entity';
import { ProductPointMapper } from './product_point.mapper';
import { ProductPointOrm } from 'src/database/typeorm/product_point.orm-entity';
import { BaseRepository } from 'src/shared/BaseModule/infrastructure/base.repository.impl';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';

@Injectable()
export class ProductPointRepositoryImpl
  extends BaseRepository<ProductPoint, ProductPointOrm, any>
  implements IProductPointRepository
{
  constructor(
    @InjectRepository(ProductPointOrm)
    protected readonly productPointRepo: Repository<ProductPointOrm>,
  ) {
    super(productPointRepo, ProductPointMapper, 'product_point', 'name');
  }

  async findAll(
    query: PaginationDto,
  ): Promise<PaginatedResponse<ProductPoint>> {
    return super.findAll(query, [
      { relation: 'product_variant', as: 'product_variant' },
      { relation: 'product_variant.product', as: 'product' },
      { relation: 'unit', as: 'unit' },
    ]);
  }

  async findById(id: number): Promise<ProductPoint | null> {
    const entity = await this.productPointRepo
      .createQueryBuilder('product_point')
      .leftJoinAndSelect('product_point.product_variant', 'product_variant')
      .leftJoinAndSelect('product_variant.product', 'product')
      .leftJoinAndSelect('product_point.unit', 'unit')
      .withDeleted()
      .where('product_point.id = :id', { id })
      .getOne();

    return entity ? ProductPointMapper.toDomain(entity) : null;
  }

  async findByProductVariantAndUnit(
    product_variant_id: number,
    unit_id: number,
  ): Promise<ProductPoint | null> {
    const entity = await this.productPointRepo
      .createQueryBuilder('product_point')
      .where('product_point.product_variant = :product_variant_id', {
        product_variant_id,
      })
      .andWhere('product_point.unit = :unit_id', { unit_id })
      .getOne();

    return entity ? ProductPointMapper.toDomain(entity) : null;
  }
}
