import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  UNIT_REPOSITORY,
  type IUnitRepository,
} from '../../domain/unit.repository';
import { Unit } from '../../domain/unit.entity';
@Injectable()
export class FindOneUnitUseCase {
  constructor(
    @Inject(UNIT_REPOSITORY) private readonly unitRepo: IUnitRepository,
  ) {}
  async execute(id: number): Promise<Unit> {
    const unit = await this.unitRepo.findById(id);
    if (!unit) throw new NotFoundException('Unit not found');
    return unit;
  }
}
