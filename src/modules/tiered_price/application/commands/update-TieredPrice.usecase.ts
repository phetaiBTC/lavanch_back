import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  TIERED_PRICE_REPOSITORY,
  type ITieredPriceRepository,
} from '../../domain/tiered_price.repository';
import { TieredPrice } from '../../domain/tiered_price.entity';
import { UpdateTieredPriceDto } from '../../dto/update-TieredPrice.dto';
import { FindOneProductVariantUseCase } from 'src/modules/product_variant/application/queries/findOne-ProductVariant.usecase';
import { FindOneUnitUseCase } from 'src/modules/unit/application/queries/findOne-Unit.usecase';
import { FindOneTieredPriceUseCase } from '../queries/findOne-TieredPrice.usecase';

@Injectable()
export class UpdateTieredPriceUseCase {
  constructor(
    @Inject(TIERED_PRICE_REPOSITORY)
    private readonly tiered_priceRepo: ITieredPriceRepository,

    private readonly usecaseFindOneProductVariant: FindOneProductVariantUseCase,
    private readonly usecaseFindOneUnit: FindOneUnitUseCase,
    private readonly usecaseFindOneTieredPrice: FindOneTieredPriceUseCase,
  ) {}

  async execute(id: number, dto: UpdateTieredPriceDto): Promise<TieredPrice> {
    const existingTier = await this.usecaseFindOneTieredPrice.execute(id);

    let productVariant = existingTier.value.product_variant;
    let unit = existingTier.value.unit;

    if (dto.product_variant_id) {
      productVariant = await this.usecaseFindOneProductVariant.execute(
        dto.product_variant_id,
      );
    }

    if (dto.unit_id) {
      unit = await this.usecaseFindOneUnit.execute(dto.unit_id);
    }

    const minQty = dto.min_quantity ?? existingTier.value.min_quantity;
    const maxQty = dto.max_quantity ?? existingTier.value.max_quantity;
    if (maxQty && minQty > maxQty) {
      throw new BadRequestException(
        'min_quantity cannot be greater than max_quantity',
      );
    }

    existingTier.value.product_variant = productVariant;
    existingTier.value.unit = unit;
    existingTier.value.min_quantity = minQty;
    existingTier.value.max_quantity = maxQty;
    existingTier.value.price_per_unit =
      dto.price_per_unit ?? existingTier.value.price_per_unit;
    existingTier.value.is_active =
      dto.is_active ?? existingTier.value.is_active;

    try {
      return await this.tiered_priceRepo.save(existingTier);
    } catch (err) {
      throw new BadRequestException('Failed to update tiered price');
    }
  }
}
