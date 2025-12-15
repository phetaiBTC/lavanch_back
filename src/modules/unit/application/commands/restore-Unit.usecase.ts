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
export class RestoreUnitUseCase {
  constructor(
    @Inject(UNIT_REPOSITORY) private readonly unitRepo: IUnitRepository,
    private readonly usecaseFIndOneUnit: FindOneUnitUseCase,
  ) {}
  async execute(id: number[]): Promise<{ message: string }> {
    await Promise.all(id.map((id) => this.usecaseFIndOneUnit.execute(id)));
    return this.unitRepo.restore(id);
  }
}
