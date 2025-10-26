import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import {
  PRODUCT_PRICE_REPOSITORY,
  type IProductPriceRepository,
} from '../../domain/product_price.repository';
import { ProductPrice } from '../../domain/product_price.entity';
import { CreateProductPriceDto } from '../../dto/create-ProductPrice.dto';
import { FindOneProductVariantUseCase } from 'src/modules/product_variant/application/queries/findOne-ProductVariant.usecase';
import { FindOneUnitUseCase } from 'src/modules/unit/application/queries/findOne-Unit.usecase';

@Injectable()
export class CreateProductPriceUseCase {
  constructor(
    @Inject(PRODUCT_PRICE_REPOSITORY)
    private readonly product_priceRepo: IProductPriceRepository,

    private readonly usecaseFindOneProductVariant: FindOneProductVariantUseCase,
    private readonly usecaseFindOneUnit: FindOneUnitUseCase,
  ) {}

  async execute(dto: CreateProductPriceDto): Promise<ProductPrice> {
    const { productVariant, unit } = await this.loadRelations(dto);
    const effectiveDate = await this.validation(dto);
    const productPrice = new ProductPrice({
      product_variant: productVariant,
      unit: unit,
      cost_price: dto.cost_price,
      selling_price: dto.selling_price,
      min_price: dto.min_price,
      is_active: dto.is_active ?? true,
      effective_date: effectiveDate,
    });

    return this.product_priceRepo.save(productPrice);
  }

  private loadRelations = async (dto: CreateProductPriceDto) => {
    const [productVariant, unit] = await Promise.all([
      this.usecaseFindOneProductVariant.execute(Number(dto.product_variant_id)),
      this.usecaseFindOneUnit.execute(Number(dto.unit_id)),
    ]);

    return { productVariant, unit };
  };

  private validation = async (dto: CreateProductPriceDto) => {
    const effectiveDate = dto.effective_date
      ? new Date(dto.effective_date)
      : new Date();
    const existingPrice = await this.product_priceRepo.findByUniqueCombination(
      dto.product_variant_id,
      dto.unit_id,
      effectiveDate,
    );
    if (existingPrice) {
      throw new BadRequestException(
        'ProductPrice for this variant, unit, and effective date already exists',
      );
    }

    if (dto.selling_price < dto.cost_price) {
      throw new BadRequestException(
        'Selling price cannot be lower than cost price',
      );
    }
    if (dto.min_price && dto.min_price > dto.selling_price) {
      throw new BadRequestException(
        'Min price cannot be higher than selling price',
      );
    }
    return effectiveDate;
  };
}
