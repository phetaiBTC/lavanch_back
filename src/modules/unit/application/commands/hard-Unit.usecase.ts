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
import { FindOneUnitUseCase } from '../queries/findOne-Unit.usecase';
@Injectable()
export class HardDeleteUnitUseCase {
  constructor(
    @Inject(UNIT_REPOSITORY) private readonly unitRepo: IUnitRepository,
    private readonly usecaseFIndOneUnit: FindOneUnitUseCase,
  ) {}
  async execute(id: number): Promise<{ message: string }> {
    await this.usecaseFIndOneUnit.execute(id);
    return this.unitRepo.hardDelete(id);
  }
}
