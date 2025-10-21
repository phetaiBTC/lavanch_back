import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IProductRepository } from '../domain/product.repository';
import { Product } from '../domain/product.entity';
import { ProductMapper } from './product.mapper';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { fetchWithPagination } from 'src/shared/utils/pagination.util';
import { ProductOrm } from 'src/database/typeorm/product.orm-entity';
@Injectable()
export class ProductRepositoryImpl implements IProductRepository {
  constructor(
    @InjectRepository(ProductOrm)
    private readonly productRepo: Repository<ProductOrm>,
  ) {}
  async findAll(query: PaginationDto): Promise<PaginatedResponse<Product>> {
    const qb = this.productRepo
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('category.parent', 'parent')
      .leftJoinAndSelect('category.children', 'children')
      .withDeleted();
    return await fetchWithPagination({
      qb,
      page: query.page || 1,
      type: query.type,
      search: { kw: query.search, field: 'name' },
      is_active: query.is_active,
      sort: query.sort,
      limit: query.limit || 10,
      toDomain: ProductMapper.toDomain,
    });
  }
  async findById(id: number): Promise<Product | null> {
    const productEntity = await this.productRepo.findOne({
      where: { id },
      relations: ['category', 'category.parent', 'category.children'],
    });
    return productEntity ? ProductMapper.toDomain(productEntity) : null;
  }
  async create(product: Product): Promise<Product> {
    const entity = this.productRepo.create(ProductMapper.toSchema(product));
    const saved = await this.productRepo.save(entity);
    return ProductMapper.toDomain(saved);
  }
  async update(product: Product): Promise<Product> {
    const saved = await this.productRepo.save(ProductMapper.toSchema(product));
    return ProductMapper.toDomain(saved);
  }
  async hardDelete(id: number): Promise<{ message: string }> {
    await this.productRepo.delete(id);
    return { message: 'hard delete sussessfully' };
  }
  async softDelete(id: number): Promise<{ message: string }> {
    await this.productRepo.softDelete(id);
    return { message: 'soft delete sussessfully' };
  }
  async restore(id: number): Promise<{ message: string }> {
    await this.productRepo.restore(id);
    return { message: 'restore sussessfully' };
  }

  async findName(name: string): Promise<Product | null> {
    const productEntity = await this.productRepo.findOne({ where: { name } });
    return productEntity ? ProductMapper.toDomain(productEntity) : null;
  }
  async findByBarcode(barcode: string): Promise<Product | null> {
    const productEntity = await this.productRepo.findOne({
      where: { barcode },
    });
    return productEntity ? ProductMapper.toDomain(productEntity) : null;
  }
}
