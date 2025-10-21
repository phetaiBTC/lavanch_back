import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ProductLot } from '../../domain/product_lot.entity';
import { UpdateProductLotDto } from '../../dto/update-ProductLot.dto';
import {
  PRODUCT_LOT_REPOSITORY,
  type IProductLotRepository,
} from '../../domain/product_lot.repository';
import { type IProductVariantRepository, PRODUCT_VARIANT_REPOSITORY } from 'src/modules/product_variant/domain/product_variant.repository';
// import { BRANCH_REPOSITORY, type IBranchRepository } from 'src/modules/branch/domain/branch.repository';
// import { CURRENCY_REPOSITORY, type ICurrencyRepository } from 'src/modules/currency/domain/currency.repository';

@Injectable()
export class UpdateProductLotUseCase {
  constructor(
    @Inject(PRODUCT_LOT_REPOSITORY)
    private readonly repo: IProductLotRepository,
    @Inject(PRODUCT_VARIANT_REPOSITORY)
    private readonly productVariantRepo: IProductVariantRepository,
    // @Inject(BRANCH_REPOSITORY)
    // private readonly branchRepo: IBranchRepository,
    // @Inject(CURRENCY_REPOSITORY)
    // private readonly currencyRepo: ICurrencyRepository,
  ) {}

  async execute(id: number, dto: UpdateProductLotDto): Promise<ProductLot> {
    const entity = await this.repo.findById(id);
    if (!entity) throw new BadRequestException('Product Lot not found');

    if (dto.product_variant_id) {
      const product_variant = await this.productVariantRepo.findById(dto.product_variant_id);
      if (!product_variant) throw new BadRequestException('Product Variant not found');
      entity.product_variant = product_variant;
    }

    // if (dto.branch_id) {
    //   const branch = await this.branchRepo.findById(dto.branch_id);
    //   if (!branch) throw new BadRequestException('Branch not found');
    //   entity.branch = branch;
    // }

    // if (dto.cost_currency_id) {
    //   const currency = await this.currencyRepo.findById(dto.cost_currency_id);
    //   if (!currency) throw new BadRequestException('Currency not found');
    //   entity.cost_currency = currency;
    // }

    if (dto.lot_number !== undefined) entity.lot_number = dto.lot_number;
    if (dto.manufacture_date !== undefined) entity.manufacture_date = new Date(dto.manufacture_date);
    if (dto.expiry_date !== undefined) entity.expiry_date = new Date(dto.expiry_date);
    if (dto.quantity !== undefined) entity.quantity = dto.quantity;
    if (dto.cost_price_local !== undefined) entity.cost_price_local = dto.cost_price_local;
    if (dto.cost_price_original !== undefined) entity.cost_price_original = dto.cost_price_original;
    if (dto.fx_rate !== undefined) entity.fx_rate = dto.fx_rate;

    return this.repo.update(entity);
  }
}
