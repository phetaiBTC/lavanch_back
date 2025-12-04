import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  UNIT_REPOSITORY,
  type IUnitRepository,
} from '../../domain/unit.repository';
import { Unit } from '../../domain/unit.entity';
import { CreateUnitDto } from '../../dto/create-Unit.dto';
import { FindOneUnitUseCase } from '../queries/findOne-Unit.usecase';
@Injectable()
export class SoftDeleteUnitUseCase {
  constructor(
    @Inject(UNIT_REPOSITORY) private readonly unitRepo: IUnitRepository,

    private readonly usecaseFIndOneUnit: FindOneUnitUseCase,
  ) {}
  async execute(id: number): Promise<{ message: string }> {
    await this.usecaseFIndOneUnit.execute(id);
    return this.unitRepo.softDelete(id);
  }
}
