import { Injectable } from '@nestjs/common';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IProductRepository } from '../domain/product.repository';
import { Product } from '../domain/product.entity';
import { ProductMapper } from './product.mapper';
import { ProductOrm } from 'src/database/typeorm/product.orm-entity';
import { BaseRepository } from 'src/shared/BaseModule/infrastructure/base.repository.impl';

@Injectable()
export class ProductRepositoryImpl
  extends BaseRepository<Product, ProductOrm, any>
  implements IProductRepository
{
  constructor(
    @InjectRepository(ProductOrm)
    readonly productRepo: Repository<ProductOrm>,
  ) {
    super({
      repository: productRepo,
      mapper: ProductMapper,
      searchField: 'name',
    });
  }
  override createQueryBuilder(): SelectQueryBuilder<ProductOrm> {
    return this.productRepo.createQueryBuilder('product');
  }
  async findName(name: string): Promise<Product | null> {
    return this.findByField('name', name);
  }

  async findByBarcode(barcode: string): Promise<Product | null> {
    return this.findByField('barcode', barcode);
  }
}
