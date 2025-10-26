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
import { CreatePriceHistoryDto } from '../../dto/create-PriceHistory.dto';
import { FindOneProductVariantUseCase } from 'src/modules/product_variant/application/queries/findOne-ProductVariant.usecase';
import { FindOneUnitUseCase } from 'src/modules/unit/application/queries/findOne-Unit.usecase';
import { GetOneUserUseCase } from 'src/modules/user/application/queries/getOne-User.usecase';

@Injectable()
export class CreatePriceHistoryUseCase {
  constructor(
    @Inject(PRICE_HISTORY_REPOSITORY)
    private readonly price_historyRepo: IPriceHistoryRepository,

    private readonly findOneProductVariant: FindOneProductVariantUseCase,
    private readonly findOneUnit: FindOneUnitUseCase,
    private readonly findOneUser: GetOneUserUseCase,
  ) {}

  async execute(dto: CreatePriceHistoryDto): Promise<PriceHistory> {
    const { productVariant, unit, changedBy } = await this.loadRelations(dto);

    await this.validatePrices(dto);

    const { product_variant_id, unit_id, changed_by, ...rest } = dto;
    const priceHistory = new PriceHistory({
      ...rest,
      product_variant: productVariant,
      unit,
      changed_by: changedBy,
      change_date: new Date(),
    });

    return this.price_historyRepo.save(priceHistory);
  }

  private async loadRelations(dto: CreatePriceHistoryDto) {
    const [productVariant, unit, changedBy] = await Promise.all([
      this.findOneProductVariant.execute(Number(dto.product_variant_id)),
      this.findOneUnit.execute(Number(dto.unit_id)),
      this.findOneUser.execute(Number(dto.changed_by)),
    ]);

    return { productVariant, unit, changedBy };
  }

  private async validatePrices(dto: CreatePriceHistoryDto) {
    [
      'old_cost_price',
      'new_cost_price',
      'old_selling_price',
      'new_selling_price',
    ].forEach((key) => {
      const value = dto[key as keyof CreatePriceHistoryDto] as number;
      if (value != null && value < 0) {
        throw new BadRequestException(`${key} must be >= 0`);
      }
    });
  }
}
