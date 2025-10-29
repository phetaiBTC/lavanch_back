import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  PRICE_HISTORY_REPOSITORY,
  type IPriceHistoryRepository,
} from '../../domain/price_history.repository';
import { PriceHistory } from '../../domain/price_history.entity';
import { UpdatePriceHistoryDto } from '../../dto/update-PriceHistory.dto';
import { FindOneProductVariantUseCase } from 'src/modules/product_variant/application/queries/findOne-ProductVariant.usecase';
import { FindOneUnitUseCase } from 'src/modules/unit/application/queries/findOne-Unit.usecase';
import { GetOneUserUseCase } from 'src/modules/user/application/queries/getOne-User.usecase';
import { FindOnePriceHistoryUseCase } from '../queries/findOne-PriceHistory.usecase';

@Injectable()
export class UpdatePriceHistoryUseCase {
  constructor(
    @Inject(PRICE_HISTORY_REPOSITORY)
    private readonly price_historyRepo: IPriceHistoryRepository,

    private readonly findOneProductVariant: FindOneProductVariantUseCase,
    private readonly findOneUnit: FindOneUnitUseCase,
    private readonly findOneUser: GetOneUserUseCase,
    private readonly findOnePriceHistory: FindOnePriceHistoryUseCase,
  ) {}

  async execute(id: number, dto: UpdatePriceHistoryDto): Promise<PriceHistory> {
    const priceHistory = await this.findOnePriceHistory.execute(id);
    this.validatePrices(dto);
    const { productVariant, unit, changedBy } = await this.loadRelations(dto);

    if (productVariant) priceHistory.value.product_variant = productVariant;
    if (unit) priceHistory.value.unit = unit;
    if (changedBy) priceHistory.value.changed_by = changedBy;

    if (dto.old_cost_price !== undefined)
      priceHistory.value.old_cost_price = dto.old_cost_price;
    if (dto.new_cost_price !== undefined)
      priceHistory.value.new_cost_price = dto.new_cost_price;
    if (dto.old_selling_price !== undefined)
      priceHistory.value.old_selling_price = dto.old_selling_price;
    if (dto.new_selling_price !== undefined)
      priceHistory.value.new_selling_price = dto.new_selling_price;
    if (dto.reason !== undefined) priceHistory.value.reason = dto.reason;
    if (dto.change_date !== undefined)
      priceHistory.value.change_date = new Date(dto.change_date);

    return this.price_historyRepo.save(priceHistory);
  }

  private async loadRelations(dto: UpdatePriceHistoryDto) {
    const [productVariant, unit, changedBy] = await Promise.all([
      this.findOneProductVariant.execute(Number(dto.product_variant_id)),
      this.findOneUnit.execute(Number(dto.unit_id)),
      this.findOneUser.execute(Number(dto.changed_by)),
    ]);
    return { productVariant, unit, changedBy };
  }

  private validatePrices(dto: UpdatePriceHistoryDto) {
    [
      'old_cost_price',
      'new_cost_price',
      'old_selling_price',
      'new_selling_price',
    ].forEach((key) => {
      const value = dto[key as keyof UpdatePriceHistoryDto] as number;
      if (value != null && value < 0) {
        throw new BadRequestException(`${key} must be >= 0`);
      }
    });
  }
}
