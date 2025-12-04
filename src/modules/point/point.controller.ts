import { Controller } from '@nestjs/common';
import { Point } from './domain/point.entity';
import { PointOrm } from 'src/database/typeorm/point.orm-entity';
import { PointResponse } from './interface/point.interface';
import { CreatePointDto } from './dto/create-Point.dto';
import { UpdatePointDto } from './dto/update-Point.dto';
import { PointMapper } from './infrastructure/point.mapper';
import { CreatePointUseCase } from './application/commands/create-Point.usecase';
import { UpdatePointUseCase } from './application/commands/update-Point.usecase';
import { FindOnePointUseCase } from './application/queries/findOne-Point.usecase';
import { FindAllPointUseCase } from './application/queries/find-Point.usecase';
import { HardDeletePointUseCase } from './application/commands/hard-Point.usecase';
import { SoftDeletePointUseCase } from './application/commands/soft-Point.usecase';
import { RestorePointUseCase } from './application/commands/restore-Point.usecase';
import { BaseController } from 'src/shared/BaseModule/BaseController';

@Controller('point')
export class PointController extends BaseController<
  Point,
  PointOrm,
  PointResponse,
  CreatePointDto,
  UpdatePointDto
> {
  constructor(
    createPointUseCase: CreatePointUseCase,
    updatePointUseCase: UpdatePointUseCase,
    findOnePointUseCase: FindOnePointUseCase,
    findAllPointUseCase: FindAllPointUseCase,
    hardDeletePointUseCase: HardDeletePointUseCase,
    softDeletePointUseCase: SoftDeletePointUseCase,
    restorePointUseCase: RestorePointUseCase,
  ) {
    super(
      PointMapper,
      createPointUseCase,
      updatePointUseCase,
      findOnePointUseCase,
      findAllPointUseCase,
      hardDeletePointUseCase,
      softDeletePointUseCase,
      restorePointUseCase,
    );
  }

  //  custom endpoints only for Point
}
