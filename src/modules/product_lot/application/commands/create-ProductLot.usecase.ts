import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ProductLot } from '../../domain/product_lot.entity';
import { CreateProductLotDto } from '../../dto/create-ProductLot.dto';
import {
  PRODUCT_LOT_REPOSITORY,
  type IProductLotRepository,
} from '../../domain/product_lot.repository';
import { FindOneProductVariantUseCase } from 'src/modules/product_variant/application/queries/findOne-ProductVariant.usecase';
import { FindOneCurrenciesUseCase } from 'src/modules/currencies/application/queries/findOne-Currencies.usecase';

@Injectable()
export class CreateProductLotUseCase {
  constructor(
    @Inject(PRODUCT_LOT_REPOSITORY)
    private readonly repo: IProductLotRepository,

    private readonly findProductVariant: FindOneProductVariantUseCase,
    private readonly usecaseFindoneCurrency: FindOneCurrenciesUseCase,
  ) {}

  async execute(dto: CreateProductLotDto): Promise<ProductLot> {
    const { product_variant, currency } = await this.loadrelations(dto);

    await this.validate(dto);

    const entity = new ProductLot({
      product_variant,
      lot_number: dto.lot_number.trim(),
      manufacture_date: dto.manufacture_date
        ? new Date(dto.manufacture_date)
        : undefined,
      expiry_date: dto.expiry_date ? new Date(dto.expiry_date) : undefined,
      quantity: dto.quantity ?? 0,
      cost_price_local: dto.cost_price_local,
      cost_currency: currency,
      cost_price_original: dto.cost_price_original,
      fx_rate: dto.fx_rate,
    });

    return this.repo.save(entity);
  }

  private async validate(dto: CreateProductLotDto) {
    const existing = await this.repo.findByCompositeKey(
      dto.product_variant_id,
      dto.lot_number,
      dto.branch_id,
    );
    if (existing) {
      throw new BadRequestException(
        'Lot number already exists for this product and branch',
      );
    }

    if (dto.manufacture_date && dto.expiry_date) {
      const mDate = new Date(dto.manufacture_date);
      const eDate = new Date(dto.expiry_date);
      if (eDate <= mDate) {
        throw new BadRequestException(
          'Expiry date must be after manufacture date',
        );
      }
    }
    if (dto.cost_price_local <= 0 || dto.cost_price_original <= 0) {
      throw new BadRequestException('Cost price must be greater than 0');
    }

    if (dto.fx_rate <= 0) {
      throw new BadRequestException('FX rate must be greater than 0');
    }

    if (dto.quantity < 0) {
      throw new BadRequestException('Quantity cannot be negative');
    }
  }

  private async loadrelations(dto: CreateProductLotDto) {
    const [product_variant, currency] = await Promise.all([
      this.findProductVariant.execute(dto.product_variant_id),
      this.usecaseFindoneCurrency.execute(dto.cost_currency_id),
    ]);

    return { product_variant, currency };
  }
}
