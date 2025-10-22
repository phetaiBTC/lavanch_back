import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ProductLot } from '../../domain/product_lot.entity';
import { UpdateProductLotDto } from '../../dto/update-ProductLot.dto';
import {
  PRODUCT_LOT_REPOSITORY,
  type IProductLotRepository,
} from '../../domain/product_lot.repository';
import {
  type IProductVariantRepository,
  PRODUCT_VARIANT_REPOSITORY,
} from 'src/modules/product_variant/domain/product_variant.repository';
import {
  CURRENCIES_REPOSITORY,
  type ICurrenciesRepository,
} from 'src/modules/currencies/domain/currencies.repository';

@Injectable()
export class UpdateProductLotUseCase {
  constructor(
    @Inject(PRODUCT_LOT_REPOSITORY)
    private readonly repo: IProductLotRepository,
    @Inject(PRODUCT_VARIANT_REPOSITORY)
    private readonly productVariantRepo: IProductVariantRepository,
    // @Inject(BRANCH_REPOSITORY)
    // private readonly branchRepo: IBranchRepository,
    @Inject(CURRENCIES_REPOSITORY)
    private readonly currencyRepo: ICurrenciesRepository,
  ) {}

  async execute(id: number, dto: UpdateProductLotDto): Promise<ProductLot> {
    const entity = await this.repo.findById(id);
    if (!entity) throw new BadRequestException('Product Lot not found');

    if (dto.product_variant_id) {
      const product_variant = await this.productVariantRepo.findById(
        dto.product_variant_id,
      );
      if (!product_variant)
        throw new BadRequestException('Product Variant not found');
      entity.update({ product_variant });
    }

    // if (dto.branch_id) {
    //   const branch = await this.branchRepo.findById(dto.branch_id);
    //   if (!branch) throw new BadRequestException('Branch not found');
    //   entity.branch = branch;
    // }

    if (dto.cost_currency_id) {
      const currency = await this.currencyRepo.findById(dto.cost_currency_id);
      if (!currency) throw new BadRequestException('Currency not found');
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
}
