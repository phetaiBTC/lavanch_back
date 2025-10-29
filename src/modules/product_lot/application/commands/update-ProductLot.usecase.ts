import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { ProductLot } from '../../domain/product_lot.entity';
import { UpdateProductLotDto } from '../../dto/update-ProductLot.dto';
import {
  PRODUCT_LOT_REPOSITORY,
  type IProductLotRepository,
} from '../../domain/product_lot.repository';
import { FindOneProductVariantUseCase } from 'src/modules/product_variant/application/queries/findOne-ProductVariant.usecase';
import { FindOneCurrenciesUseCase } from 'src/modules/currencies/application/queries/findOne-Currencies.usecase';
import { FindOneProductLotUseCase } from '../queries/findOne-ProductLot.usecase';

@Injectable()
export class UpdateProductLotUseCase {
  constructor(
    @Inject(PRODUCT_LOT_REPOSITORY)
    private readonly repo: IProductLotRepository,

    private readonly findProductVariant: FindOneProductVariantUseCase,
    private readonly usecaseFindoneCurrency: FindOneCurrenciesUseCase,
    private readonly usecaseFIndOneProductLot: FindOneProductLotUseCase,
  ) {}

  async execute(id: number, dto: UpdateProductLotDto): Promise<ProductLot> {
    const existing = await this.usecaseFIndOneProductLot.execute(id);
    const { product_variant, currency } = await this.loadrelations(dto);

    await this.validate(dto, id);

    existing.value.product_variant =
      product_variant ?? existing.value.product_variant;
    existing.value.lot_number = dto.lot_number ?? existing.value.lot_number;
    existing.value.manufacture_date = dto.manufacture_date
      ? new Date(dto.manufacture_date)
      : existing.value.manufacture_date;
    existing.value.expiry_date = dto.expiry_date
      ? new Date(dto.expiry_date)
      : existing.value.expiry_date;
    existing.value.quantity = dto.quantity ?? existing.value.quantity;
    existing.value.cost_price_local =
      dto.cost_price_local ?? existing.value.cost_price_local;
    existing.value.cost_currency = currency ?? existing.value.cost_currency;
    existing.value.cost_price_original =
      dto.cost_price_original ?? existing.value.cost_price_original;
    existing.value.fx_rate = dto.fx_rate ?? existing.value.fx_rate;
    return this.repo.save(existing);
  }

  private async validate(dto: UpdateProductLotDto, id: number) {
    if (dto.lot_number && dto.product_variant_id && dto.branch_id) {
      const duplicate = await this.repo.findByCompositeKey(
        dto.product_variant_id,
        dto.lot_number,
        dto.branch_id,
      );
      if (duplicate && duplicate.value.id !== id) {
        throw new BadRequestException(
          'Another lot already exists with this product, lot number, and branch',
        );
      }
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

    if (dto.cost_price_local && dto.cost_price_local <= 0) {
      throw new BadRequestException('Invalid local cost price');
    }

    if (dto.cost_price_original && dto.cost_price_original <= 0) {
      throw new BadRequestException('Invalid original cost price');
    }

    if (dto.fx_rate && dto.fx_rate <= 0) {
      throw new BadRequestException('FX rate must be greater than 0');
    }

    if (dto.quantity !== undefined && dto.quantity < 0) {
      throw new BadRequestException('Quantity cannot be negative');
    }
  }

  private async loadrelations(dto: UpdateProductLotDto) {
    const [product_variant, currency] = await Promise.all([
      this.findProductVariant.execute(dto.product_variant_id),
      this.usecaseFindoneCurrency.execute(dto.cost_currency_id),
    ]);
    return { product_variant, currency };
  }
}
