import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductPointOrm } from 'src/database/typeorm/product_point.orm-entity';
import { IProductPointRepository } from '../domain/product_point.repository';
import { ProductPoint } from '../domain/product_point.entity';
import { ProductPointMapper } from './product_point.mapper';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { fetchWithPagination } from 'src/shared/utils/pagination.util';
@Injectable()
export class ProductPointRepositoryImpl implements IProductPointRepository {
  constructor(
    @InjectRepository(ProductPointOrm)
    private readonly product_pointRepo: Repository<ProductPointOrm>,
  ) {}
  async findAll(
    query: PaginationDto,
  ): Promise<PaginatedResponse<ProductPoint>> {
    const qb = this.product_pointRepo
      .createQueryBuilder('product_point')
      .leftJoinAndSelect('product_point.product_variant', 'product_variant')
      .leftJoinAndSelect('product_variant.product', 'product')
      .leftJoinAndSelect('product_point.unit', 'unit')
      .withDeleted();
    return await fetchWithPagination({
      qb,
      page: query.page || 1,
      type: query.type,
      search: { kw: query.search, field: 'name' },
      is_active: query.is_active,
      sort: query.sort,
      limit: query.limit || 10,
      toDomain: ProductPointMapper.toDomain,
    });
  }
  async findById(id: number): Promise<ProductPoint | null> {
        const qb = this.product_pointRepo
      .createQueryBuilder('product_point')
      .leftJoinAndSelect('product_point.product_variant', 'product_variant')
      .leftJoinAndSelect('product_variant.product', 'product')
      .leftJoinAndSelect('product_point.unit', 'unit')
      .withDeleted()
      .where('product_point.id = :id', { id });
    const product_pointEntity = await qb.getOne();
    return product_pointEntity
      ? ProductPointMapper.toDomain(product_pointEntity)
      : null;
  }
  async create(product_point: ProductPoint): Promise<ProductPoint> {
    const entity = this.product_pointRepo.create(
      ProductPointMapper.toSchema(product_point),
    );
    const saved = await this.product_pointRepo.save(entity);
    return ProductPointMapper.toDomain(saved);
  }
  async update(product_point: ProductPoint): Promise<ProductPoint> {
    const saved = await this.product_pointRepo.save(
      ProductPointMapper.toSchema(product_point),
    );
    return ProductPointMapper.toDomain(saved);
  }
  async hardDelete(id: number): Promise<{ message: string }> {
    await this.product_pointRepo.delete(id);
    return { message: 'hard delete sussessfully' };
  }
  async softDelete(id: number): Promise<{ message: string }> {
    await this.product_pointRepo.softDelete(id);
    return { message: 'soft delete sussessfully' };
  }
  async restore(id: number): Promise<{ message: string }> {
    await this.product_pointRepo.restore(id);
    return { message: 'restore sussessfully' };
  }
  async findByProductVariantAndUnit(
    product_variant_id: number,
    unit_id: number,
  ): Promise<ProductPoint | null> {
    const query = this.product_pointRepo
      .createQueryBuilder('product_point')
      .where('product_point.product_variant = :product_variant_id', {
        product_variant_id,
      })
      .andWhere('product_point.unit = :unit_id', { unit_id });

    const product_pointEntity = await query.getOne();
    return product_pointEntity
      ? ProductPointMapper.toDomain(product_pointEntity)
      : null;
  }
}
