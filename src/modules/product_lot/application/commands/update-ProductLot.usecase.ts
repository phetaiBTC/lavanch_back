import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ProductLot } from '../../domain/product_lot.entity';
import { UpdateProductLotDto } from '../../dto/update-ProductLot.dto';
import {
  PRODUCT_LOT_REPOSITORY,
  type IProductLotRepository,
} from '../../domain/product_lot.repository';
import { FindOneProductVariantUseCase } from 'src/modules/product_variant/application/queries/findOne-ProductVariant.usecase';
import { FindOneCurrenciesUseCase } from 'src/modules/currencies/application/queries/findOne-Currencies.usecase';

@Injectable()
export class UpdateProductLotUseCase {
  constructor(
    @Inject(PRODUCT_LOT_REPOSITORY)
    private readonly repo: IProductLotRepository,
    private readonly findProductVariant: FindOneProductVariantUseCase,
    private readonly usecaseFindoneCurrency: FindOneCurrenciesUseCase
  ) {}

  async execute(id: number, dto: UpdateProductLotDto): Promise<ProductLot> {
    const entity = await this.repo.findById(id);
    if (!entity) throw new BadRequestException('Product Lot not found');

    const { product_variant, currency } = await this.loadrelations(dto);

    if (dto.product_variant_id) {
      entity.update({ product_variant });
    }
    if (dto.cost_currency_id) {
      entity.update({ cost_currency: currency });
    }

    entity.update({
      lot_number: dto.lot_number,
      manufacture_date: dto.manufacture_date
        ? new Date(dto.manufacture_date)
        : undefined,
      expiry_date: dto.expiry_date ? new Date(dto.expiry_date) : undefined,
      quantity: dto.quantity ?? 0,
      cost_price_local: dto.cost_price_local,
      cost_price_original: dto.cost_price_original,
      fx_rate: dto.fx_rate,
    });

    return this.repo.save(entity);
  }

    async loadrelations(dto: UpdateProductLotDto) {
      const product_variant = await this.findProductVariant.execute(dto.product_variant_id);
      const currency = await this.usecaseFindoneCurrency.execute(dto.cost_currency_id);
      return { product_variant, currency }
    }
}
