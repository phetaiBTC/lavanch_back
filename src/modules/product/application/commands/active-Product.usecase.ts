import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  PRODUCT_REPOSITORY,
  type IProductRepository,
} from '../../domain/product.repository';
import {
  CATEGORY_REPOSITORY,
  type ICategoryRepository,
} from 'src/modules/category/domain/category.repository';
import { Product } from '../../domain/product.entity';
import { UpdateProductDto } from '../../dto/update-Product.dto';
import { ActiveDto } from 'src/shared/dto/avtive.dto';

@Injectable()
export class ActiveProductUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepo: IProductRepository,
  ) {}
  async execute(id: number, dto: ActiveDto): Promise<Product> {
    const product = await this.productRepo.findById(id);
    if (!product) throw new BadRequestException('Product not found');
    product.update({ is_active: dto.is_active });
    return this.productRepo.save(product);
  }
}
