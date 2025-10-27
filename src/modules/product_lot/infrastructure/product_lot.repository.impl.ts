import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IProductLotRepository } from '../domain/product_lot.repository';
import { ProductLot } from '../domain/product_lot.entity';
import { ProductLotMapper } from './product_lot.mapper';
import { ProductLotOrm } from 'src/database/typeorm/product_lot.orm-entity';
import { BaseRepository } from 'src/shared/BaseModule/infrastructure/base.repository.impl';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';

@Injectable()
export class ProductLotRepositoryImpl
  extends BaseRepository<ProductLot, ProductLotOrm, any>
  implements IProductLotRepository
{
  constructor(
    @InjectRepository(ProductLotOrm)
    protected readonly productLotRepo: Repository<ProductLotOrm>,
  ) {
    super(productLotRepo, ProductLotMapper, 'product_lot', 'name');
  }
  async findAll(query: PaginationDto): Promise<PaginatedResponse<ProductLot>> {
    return super.findAll(query);
  }
  async findByCompositeKey(
    product_variant_id: number,
    lot_number: string,
    branch_id: number,
  ): Promise<ProductLot | null> {
    const orm = await this.productLotRepo.findOne({
      where: {
        product_variant: { id: product_variant_id },
        lot_number: lot_number,
        // branch: { id: branch_id },
      },
      relations: ['product_variant', 'cost_currency', 'branch'],
    });
    return orm ? ProductLotMapper.toDomain(orm) : null;
  }
}
