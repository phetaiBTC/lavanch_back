import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  TIERED_PRICE_REPOSITORY,
  type ITieredPriceRepository,
} from '../../domain/tiered_price.repository';
import { TieredPrice } from '../../domain/tiered_price.entity';
import { CreateTieredPriceDto } from '../../dto/create-TieredPrice.dto';
import { FindOneProductVariantUseCase } from 'src/modules/product_variant/application/queries/findOne-ProductVariant.usecase';
import { FindOneUnitUseCase } from 'src/modules/unit/application/queries/findOne-Unit.usecase';

@Injectable()
export class CreateTieredPriceUseCase {
  constructor(
    @Inject(TIERED_PRICE_REPOSITORY)
    private readonly tiered_priceRepo: ITieredPriceRepository,

    private readonly usecaseFindOneProductVariant: FindOneProductVariantUseCase,
    private readonly usecaseFindOneUnit: FindOneUnitUseCase,
  ) {}

  async execute(dto: CreateTieredPriceDto): Promise<TieredPrice> {
    const { productVariant, unit } = await this.loadRelations(dto);
    if (dto.max_quantity && dto.min_quantity > dto.max_quantity) {
      throw new BadRequestException(
        'min_quantity cannot be greater than max_quantity',
      );
    }
    const tiered_price = new TieredPrice({
      product_variant: productVariant,
      unit,
      min_quantity: dto.min_quantity,
      max_quantity: dto.max_quantity,
      price_per_unit: dto.price_per_unit,
      is_active: dto.is_active ?? true,
    });

    try {
      return await this.tiered_priceRepo.save(tiered_price);
    } catch (err) {
      throw new BadRequestException('Failed to create tiered price');
    }
  }

  private loadRelations = async (dto: CreateTieredPriceDto) => {
    const [productVariant, unit] = await Promise.all([
      this.usecaseFindOneProductVariant.execute(Number(dto.product_variant_id)),
      this.usecaseFindOneUnit.execute(Number(dto.unit_id)),
    ]);
    return { productVariant, unit };
  };
}
