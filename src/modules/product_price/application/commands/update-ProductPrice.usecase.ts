import {
  Inject,
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import {
  PRODUCT_PRICE_REPOSITORY,
  type IProductPriceRepository,
} from '../../domain/product_price.repository';
import { ProductPrice } from '../../domain/product_price.entity';
import { UpdateProductPriceDto } from '../../dto/update-ProductPrice.dto';
import { FindOneProductVariantUseCase } from 'src/modules/product_variant/application/queries/findOne-ProductVariant.usecase';
import { FindOneUnitUseCase } from 'src/modules/unit/application/queries/findOne-Unit.usecase';
import { FindOneProductPriceUseCase } from '../queries/findOne-ProductPrice.usecase';

@Injectable()
export class UpdateProductPriceUseCase {
  constructor(
    @Inject(PRODUCT_PRICE_REPOSITORY)
    private readonly product_priceRepo: IProductPriceRepository,

    private readonly usecaseFindOneProductVariant: FindOneProductVariantUseCase,
    private readonly usecaseFindOneUnit: FindOneUnitUseCase,
    private readonly usecaseFindOneProductPrice: FindOneProductPriceUseCase,
  ) {}

  async execute(id: number, dto: UpdateProductPriceDto): Promise<ProductPrice> {
    const existing = await this.usecaseFindOneProductPrice.execute(id);

    const { productVariant, unit } = await this.loadRelations(dto);

    const effectiveDate = await this.validation(dto, id, existing);

    const updated = existing.update({
      product_variant: productVariant ?? existing.value.product_variant,
      unit: unit ?? existing.value.unit,
      cost_price: dto.cost_price ?? existing.value.cost_price,
      selling_price: dto.selling_price ?? existing.value.selling_price,
      min_price: dto.min_price ?? existing.value.min_price,
      is_active: dto.is_active ?? existing.value.is_active,
      effective_date: effectiveDate ?? existing.value.effective_date,
    });

    return this.product_priceRepo.save(updated);
  }

  private loadRelations = async (dto: UpdateProductPriceDto) => {
    const [productVariant, unit] = await Promise.all([
      this.usecaseFindOneProductVariant.execute(Number(dto.product_variant_id)),
      this.usecaseFindOneUnit.execute(Number(dto.unit_id)),
    ]);

    return { productVariant, unit };
  };

  private validation = async (
    dto: UpdateProductPriceDto,
    id: number,
    existing: ProductPrice,
  ) => {
    const effectiveDate = dto.effective_date
      ? new Date(dto.effective_date)
      : existing.value.effective_date;

    if (dto.product_variant_id || dto.unit_id || dto.effective_date) {
      const existingPrice =
        await this.product_priceRepo.findByUniqueCombination(
          dto.product_variant_id,
          dto.unit_id,
          effectiveDate,
        );
      if (existingPrice) {
        throw new BadRequestException(
          'ProductPrice for this variant, unit, and effective date already exists',
        );
      }
    }

    if (
      dto.cost_price != null &&
      dto.selling_price != null &&
      dto.selling_price < dto.cost_price
    ) {
      throw new BadRequestException(
        'Selling price cannot be lower than cost price',
      );
    }

    if (
      dto.min_price != null &&
      dto.selling_price != null &&
      dto.min_price > dto.selling_price
    ) {
      throw new BadRequestException(
        'Min price cannot be higher than selling price',
      );
    }

    return effectiveDate;
  };
}
