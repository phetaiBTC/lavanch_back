import { Controller, Patch, Param, Body } from '@nestjs/common';
import { Unit } from './domain/unit.entity';
import { UnitOrm } from 'src/database/typeorm/unit.orm-entity';
import { UnitResponse } from './interface/unit.interface';
import { CreateUnitDto } from './dto/create-Unit.dto';
import { UpdateUnitDto } from './dto/update-Unit.dto';
import { ActiveDto } from 'src/shared/dto/avtive.dto';
import { UnitMapper } from './infrastructure/unit.mapper';
import { CreateUnitUseCase } from './application/commands/create-Unit.usecase';
import { UpdateUnitUseCase } from './application/commands/update-Unit.usecase';
import { FindOneUnitUseCase } from './application/queries/findOne-Unit.usecase';
import { FindAllUnitUseCase } from './application/queries/find-Unit.usecase';
import { HardDeleteUnitUseCase } from './application/commands/hard-Unit.usecase';
import { SoftDeleteUnitUseCase } from './application/commands/soft-Unit.usecase';
import { RestoreUnitUseCase } from './application/commands/restore-Unit.usecase';
import { ActiveUnitUseCase } from './application/commands/active-Unit.usecase';
import { BaseController } from 'src/shared/BaseModule/BaseController';

@Controller('unit')
export class UnitController extends BaseController<
  Unit,
  UnitOrm,
  UnitResponse,
  CreateUnitDto,
  UpdateUnitDto
> {
  constructor(
    createUnitUseCase: CreateUnitUseCase,
    updateUnitUseCase: UpdateUnitUseCase,
    findOneUnitUseCase: FindOneUnitUseCase,
    findAllUnitUseCase: FindAllUnitUseCase,
    hardDeleteUnitUseCase: HardDeleteUnitUseCase,
    softDeleteUnitUseCase: SoftDeleteUnitUseCase,
    restoreUnitUseCase: RestoreUnitUseCase,
    private readonly updateActiveUnitUseCase: ActiveUnitUseCase, // custom
  ) {
    super(
      UnitMapper,
      createUnitUseCase,
      updateUnitUseCase,
      findOneUnitUseCase,
      findAllUnitUseCase,
      hardDeleteUnitUseCase,
      softDeleteUnitUseCase,
      restoreUnitUseCase,
    );
  }

  // custom endpoint only for Unit
  @Patch('active-update/:id')
  async activeUpdate(
    @Param('id') id: number,
    @Body() dto: ActiveDto,
  ): Promise<UnitResponse> {
    return UnitMapper.toResponse(
      await this.updateActiveUnitUseCase.execute(id, dto),
    );
  }
}
