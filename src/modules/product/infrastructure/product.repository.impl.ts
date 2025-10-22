
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IProductRepository } from '../domain/product.repository';
import { Product } from '../domain/product.entity';
import { ProductMapper } from './product.mapper';
import { ProductOrm } from 'src/database/typeorm/product.orm-entity';
import { BaseRepository } from 'src/shared/BaseModule/infrastructure/base.repository.impl';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';

@Injectable()
export class ProductRepositoryImpl
  extends BaseRepository<Product, ProductOrm, any>
  implements IProductRepository
{
  constructor(
    @InjectRepository(ProductOrm)
    readonly productRepo: Repository<ProductOrm>,
  ) {
    super(productRepo, ProductMapper, 'product', 'name');
  }

  async findAll(query: PaginationDto): Promise<PaginatedResponse<Product>> {
    return super.findAll(query, [
      { relation: 'product.category', as: 'category' },
      { relation: 'category.parent', as: 'parent' },
      { relation: 'category.children', as: 'children' },
    ]);
  }

  async findName(name: string): Promise<Product | null> {
    return this.findByField('name', name);
  }

  async findByBarcode(barcode: string): Promise<Product | null> {
    return this.findByField('barcode', barcode);
  }
}
