import { Controller } from '@nestjs/common';
import { CreateTieredPriceDto } from './dto/create-TieredPrice.dto';
import { UpdateTieredPriceDto } from './dto/update-TieredPrice.dto';
import { CreateTieredPriceUseCase } from './application/commands/create-TieredPrice.usecase';
import { UpdateTieredPriceUseCase } from './application/commands/update-TieredPrice.usecase';
import { HardDeleteTieredPriceUseCase } from './application/commands/hard-TieredPrice.usecase';
import { SoftDeleteTieredPriceUseCase } from './application/commands/soft-TieredPrice.usecase';
import { RestoreTieredPriceUseCase } from './application/commands/restore-TieredPrice.usecase';
import { FindOneTieredPriceUseCase } from './application/queries/findOne-TieredPrice.usecase';
import { FindAllTieredPriceUseCase } from './application/queries/find-TieredPrice.usecase';
import { TieredPriceMapper } from './infrastructure/tiered_price.mapper';
import { TieredPriceResponse } from './interface/tiered_price.interface';
import { BaseController } from 'src/shared/BaseModule/BaseController';
import { TieredPrice } from './domain/tiered_price.entity';
import { TieredPriceOrm } from 'src/database/typeorm/tiered-price.orm-entity';
@Controller('tiered_price')
export class TieredPriceController extends BaseController<
  TieredPrice,
  TieredPriceOrm,
  TieredPriceResponse,
  CreateTieredPriceDto,
  UpdateTieredPriceDto
> {
  constructor(
    protected readonly createTieredPriceUseCase: CreateTieredPriceUseCase,
    protected readonly updateTieredPriceUseCase: UpdateTieredPriceUseCase,
    protected readonly hardDeleteTieredPriceUseCase: HardDeleteTieredPriceUseCase,
    protected readonly softDeleteTieredPriceUseCase: SoftDeleteTieredPriceUseCase,
    protected readonly restoreTieredPriceUseCase: RestoreTieredPriceUseCase,
    protected readonly findOneTieredPriceUseCase: FindOneTieredPriceUseCase,
    protected readonly findAllTieredPriceUseCase: FindAllTieredPriceUseCase,
  ) {
    super(
      TieredPriceMapper,
      createTieredPriceUseCase,
      updateTieredPriceUseCase,
      findOneTieredPriceUseCase,
      findAllTieredPriceUseCase,
      hardDeleteTieredPriceUseCase,
      softDeleteTieredPriceUseCase,
      restoreTieredPriceUseCase,
    );
  }
}
